import { http, HttpResponse } from 'msw';
import { GetUsersListResponse } from '@/entities/user/api/contracts';
import { unauthorizedError } from '../utils/httpErrors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { getUserById } from '@/entities/user/lib/userSelectors';
import { users } from '../db/users';

export const usersHandlers = [
  http.get('/api/users', ({ cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const response: GetUsersListResponse = {
      users: users.map((item) => ({ name: item.name, id: item.id })),
    };

    return HttpResponse.json(response);
  }),
];
