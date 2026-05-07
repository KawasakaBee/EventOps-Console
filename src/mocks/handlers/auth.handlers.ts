import {
  PostDemoLoginRequest,
  PostDemoLoginResponse,
  PostLogoutResponse,
} from '@/shared/api/contracts/auth.contract';
import { isDemoRole } from '@/shared/utils/typeGuards';
import { http, HttpResponse } from 'msw';
import { roleError } from '../db/errors';
import { User } from '@/entities/user/model/types';
import { manager, reviewer, speaker } from '@/shared/data';

export const authHandlers = [
  http.post('/api/demo-login', async ({ request }) => {
    const body = (await request.json()) as PostDemoLoginRequest; //Провалидировать
    const role = body.role;

    if (!isDemoRole(role)) return roleError();

    const response: PostDemoLoginResponse = { ok: true };

    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Set-Cookie': `demo-role=${role}; Path=/; SameSite=Lax`,
      },
    });
  }),
  http.post('/api/logout', ({ cookies }) => {
    const role = cookies['demo-role'];

    if (!isDemoRole(role)) return roleError();

    const response: PostLogoutResponse = { ok: true };

    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Set-Cookie': 'demo-role=; Path=/; Max-Age=0; SameSite=Lax',
      },
    });
  }),
  http.get('/api/me', async ({ cookies }) => {
    const role = cookies['demo-role'];

    if (!isDemoRole(role)) return roleError();

    let response: User;

    switch (role) {
      case 'manager':
        response = manager;
        break;
      case 'reviewer':
        response = reviewer;
        break;
      case 'speaker':
        response = speaker;
        break;
    }

    return HttpResponse.json(response);
  }),
];
