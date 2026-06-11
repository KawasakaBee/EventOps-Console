import { getUserById } from '@/entities/user/lib/userSelectors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { http, HttpResponse } from 'msw';
import {
  forbiddenError,
  inclusiveEventError,
  unauthorizedError,
  validationError,
} from '../utils/httpErrors';
import { isManagerLike } from '../utils/proposalAccess';
import { settingsSchema } from '@/entities/event/api/schema';
import zodErrorParse from '../utils/zodErrorParse';
import { appendEventToData, createEvent } from '../db/events';
import { PostEventCreateResponse } from '@/entities/event/api/contracts';

export const settingsHandlers = [
  http.post('/api/settings', async ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();
    if (!isManagerLike(user.role)) return forbiddenError();

    const rawBody = await request.json();

    const parsedBody = settingsSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      const errorBody = zodErrorParse(parsedBody.error);
      return validationError(errorBody);
    }

    const body = parsedBody.data;
    const event = createEvent(body);

    const appendResult = appendEventToData(event);
    if (!appendResult.ok) return inclusiveEventError();

    user.eventIds.push(event.id);

    const response: PostEventCreateResponse = { ok: true, event };

    return HttpResponse.json(response);
  }),
];
