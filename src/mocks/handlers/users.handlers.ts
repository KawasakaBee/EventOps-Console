import { isRole } from '@/shared/utils/typeGuards';
import { http, HttpResponse } from 'msw';
import { userError } from '../db/errors';
import { GetUsersListResponse } from '@/shared/api/contracts/user.contract';
import { users } from '../db/users';

export const usersHandlers = [
  http.get('/api/users', ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    if (!userId || !isRole(userRole)) return userError;

    const response: GetUsersListResponse = {
      users: users.map((item) => ({ name: item.name, id: item.id })),
    };

    return HttpResponse.json(response);
  }),
];
