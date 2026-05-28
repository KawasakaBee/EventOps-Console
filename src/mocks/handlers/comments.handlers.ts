import { http, HttpResponse } from 'msw';
import { unauthorizedError } from '../utils/httpErrors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { getUserById } from '@/entities/user/lib/userSelectors';
import { GetCommentsResponse } from '@/entities/comment/api/contracts';
import { comments } from '../db/comments';

export const commentsHandlers = [
  http.get('/api/comments', ({ cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const response: GetCommentsResponse = {
      comments,
    };

    return HttpResponse.json(response);
  }),
];
