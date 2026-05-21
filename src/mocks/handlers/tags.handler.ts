import { http, HttpResponse } from 'msw';
import { unauthorizedError } from '../utils/httpErrors';
import { GetTagsResponse } from '@/entities/tag/api/contracts';
import { Tag, tags } from '@/entities/tag/model/types';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { getUserById } from '@/entities/user/lib/userSelectors';

export const tagsHandlers = [
  http.get('/api/tags', ({ cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const response: GetTagsResponse = {
      tags: [...tags] satisfies Tag[],
    };

    return HttpResponse.json(response);
  }),
];
