import { http, HttpResponse } from 'msw';
import { GetReviewersResponse } from '@/entities/reviewer/api/contracts';
import { unauthorizedError } from '../utils/httpErrors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { getUserById } from '@/entities/user/lib/userSelectors';
import { reviewers } from '../db/reviews';

export const reviewersHandlers = [
  http.get('/api/reviewers', ({ cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const response: GetReviewersResponse = {
      reviewers: reviewers.map((item) => ({ id: item.id, name: item.name })),
    };

    return HttpResponse.json(response);
  }),
];
