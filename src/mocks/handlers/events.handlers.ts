import { getUserById } from '@/entities/user/lib/userSelectors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { http, HttpResponse } from 'msw';
import { unauthorizedError } from '../utils/httpErrors';
import { GetEventsListResponse } from '@/entities/event/api/contracts';
import { events } from '../db/events';

export const eventsHandlers = [
  http.get('/api/events', ({ cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const availableEvents = events.filter((event) =>
      user.eventIds.includes(event.id),
    );

    const response: GetEventsListResponse = { events: availableEvents };

    return HttpResponse.json(response);
  }),
];
