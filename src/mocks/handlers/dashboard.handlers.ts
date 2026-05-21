import { GetDashboardResponse } from '@/entities/dashboard/api/contracts';
import { http, HttpResponse } from 'msw';
import { getDashboard } from '../db/dashboard';
import {
  forbiddenError,
  queryError,
  unauthorizedError,
} from '../utils/httpErrors';
import { isDashboardRange } from '@/entities/dashboard/model/typeGuards';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { getUserById } from '@/entities/user/lib/userSelectors';
import { isManagerLike } from '../utils/proposalAccess';

export const dashboardHandlers = [
  http.get('/api/events/:eventId/dashboard', async ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    if (!isManagerLike(user.role)) return forbiddenError();

    const url = new URL(request.url);
    const range = url.searchParams.get('range') ?? '30d';

    if (!isDashboardRange(range)) return queryError();

    const dashboard = getDashboard(range);
    const response: GetDashboardResponse = dashboard;

    return HttpResponse.json(response);
  }),
];
