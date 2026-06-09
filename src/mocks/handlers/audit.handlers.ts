import { getUserById } from '@/entities/user/lib/userSelectors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { http, HttpResponse } from 'msw';
import { forbiddenError, unauthorizedError } from '../utils/httpErrors';
import { isManagerLike } from '../utils/proposalAccess';
import { applyAuditFilters, applyAuditSearch } from '../utils/auditFilters';
import { applyAuditSort } from '../utils/auditSort';
import { paginateAudit } from '../utils/auditList';
import { parseAuditListQuery } from '@/entities/audit/lib/parseAuditListQuery';
import { GetAuditListResponse } from '@/entities/audit/api/contracts';
import { audit } from '../db/audit';
import { AuditLog } from '@/entities/audit/model/types';

export const auditHandlers = [
  http.get('/api/audit', ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const userRole = user.role;

    const access = isManagerLike(userRole);
    if (!access) return forbiddenError();

    const queryParams = parseAuditListQuery(request.url);
    let result: AuditLog[] = audit.filter((item) =>
      user.eventIds.includes(item.eventId),
    );

    result = applyAuditSearch(queryParams, result);
    result = applyAuditFilters(queryParams, result);
    result = applyAuditSort(queryParams, result);

    const total = result.length;

    result = paginateAudit(queryParams, result);

    const response: GetAuditListResponse = {
      items: result,
      page: queryParams.page,
      pageSize: queryParams.pageSize,
      total,
      totalPages: Math.ceil(total / queryParams.pageSize),
    };

    return HttpResponse.json(response);
  }),
];
