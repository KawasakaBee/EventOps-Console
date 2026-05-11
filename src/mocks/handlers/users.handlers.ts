import { http, HttpResponse } from 'msw';
import { GetUsersListResponse } from '@/entities/user/api/contracts';
import { users } from '../db/users';
import { userError } from '../utils/httpErrors';
import { isRole } from '@/entities/user/model/typeGuards';

export const usersHandlers = [
  http.get('/api/users', ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    if (!userId || !isRole(userRole)) return userError();

    const response: GetUsersListResponse = {
      users: users.map((item) => ({ name: item.name, id: item.id })),
    };

    return HttpResponse.json(response);
  }),
];
