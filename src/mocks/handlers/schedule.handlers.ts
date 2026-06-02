import { getUserById } from '@/entities/user/lib/userSelectors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { http, HttpResponse } from 'msw';
import { forbiddenError, unauthorizedError } from '../utils/httpErrors';
import { GetScheduleResponse } from '@/entities/schedule/api/contracts';
import { schedule } from '../db/schedule';
import { isManagerLike } from '../utils/proposalAccess';
import { parseScheduleQuery } from '@/entities/schedule/lib/parseScheduleQuery';
import { applyScheduleFilters } from '../utils/scheduleFilters';
import scheduleSlotToResponseSlot from '../utils/scheduleSlotToResponseSlot';

export const scheduleHandlers = [
  http.get('/api/schedule', ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();
    if (!isManagerLike(user.role)) return forbiddenError();

    const queryParams = parseScheduleQuery(request.url, schedule);
    let result = schedule;

    result = applyScheduleFilters(queryParams, result);
    const slots = scheduleSlotToResponseSlot(result.slots);

    const response: GetScheduleResponse = { ...result, slots };

    return HttpResponse.json(response);
  }),
];
