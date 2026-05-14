import { http, HttpResponse } from 'msw';
import { userError } from '../utils/httpErrors';
import { isRole } from '@/entities/user/model/typeGuards';
import { GetTagsResponse } from '@/entities/tag/api/contracts';
import { Tag, tags } from '@/entities/tag/model/types';

export const tagsHandlers = [
  http.get('/api/tags', ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    if (!userId || !isRole(userRole)) return userError();

    const response: GetTagsResponse = {
      tags: [...tags] satisfies Tag[],
    };

    return HttpResponse.json(response);
  }),
];
