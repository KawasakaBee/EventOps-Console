import { getUserById } from '@/entities/user/lib/userSelectors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { http, HttpResponse } from 'msw';
import {
  forbiddenError,
  scheduleAssignError,
  unauthorizedError,
  validationError,
} from '../utils/httpErrors';
import {
  GetScheduleResponse,
  PatchScheduleAssignResponse,
} from '@/entities/schedule/api/contracts';
import { assignScheduleSlot, schedule } from '../db/schedule';
import { isManagerLike } from '../utils/proposalAccess';
import { parseScheduleQuery } from '@/entities/schedule/lib/parseScheduleQuery';
import { applyScheduleFilters } from '../utils/scheduleFilters';
import scheduleSlotToResponseSlot from '../utils/scheduleSlotToResponseSlot';
import { scheduleSchema } from '@/entities/schedule/api/schema';
import zodErrorParse from '../utils/zodErrorParse';
import { isValidScheduleAssignment } from '../utils/isValidScheduleAssignment';
import scheduleAssignErrorParse from '../utils/scheduleAssignErrorParse';

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
  http.patch('/api/schedule/assign', async ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();
    if (!isManagerLike(user.role)) return forbiddenError();

    const rawBody = await request.json();

    const parsedBody = scheduleSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      const errorBody = zodErrorParse(parsedBody.error);
      return validationError(errorBody);
    }

    const body = parsedBody.data;

    const assignmentValidation = isValidScheduleAssignment(body);

    if (assignmentValidation !== true) {
      const errorBody = scheduleAssignErrorParse(assignmentValidation);
      return scheduleAssignError(errorBody);
    }

    const [slot] = scheduleSlotToResponseSlot([assignScheduleSlot(body)]);

    const response: PatchScheduleAssignResponse = { slot };

    return HttpResponse.json(response);
  }),
];
