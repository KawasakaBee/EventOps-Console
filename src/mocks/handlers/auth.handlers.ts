import { http, HttpResponse } from 'msw';
import {
  unauthorizedError,
  userError,
  validationError,
} from '../utils/httpErrors';
import {
  GetCurrentUserResponse,
  PostDemoLoginResponse,
  PostLogoutResponse,
} from '@/entities/user/api/contracts';
import { demoRoleSchema } from '@/entities/user/api/schema';
import zodErrorParse from '../utils/zodErrorParse';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import {
  getDemoUserByRole,
  getUserById,
} from '@/entities/user/lib/userSelectors';

export const authHandlers = [
  http.post('/api/demo-login', async ({ request }) => {
    const rawBody = await request.json();

    const parsedBody = demoRoleSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      const errorBody = zodErrorParse(parsedBody.error);
      return validationError(errorBody);
    }

    const role = parsedBody.data.role;
    const demoUser = getDemoUserByRole(role);

    if (!demoUser) return userError();

    const response: PostDemoLoginResponse = { ok: true };

    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Set-Cookie': `${AUTH_SESSION_COOKIE}=${demoUser.id}; Path=/; SameSite=Lax`,
      },
    });
  }),
  http.post('/api/logout', () => {
    const response: PostLogoutResponse = { ok: true };

    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Set-Cookie': `${AUTH_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`,
      },
    });
  }),
  http.get('/api/me', async ({ cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const response: GetCurrentUserResponse = { user };

    return HttpResponse.json(response);
  }),
];
