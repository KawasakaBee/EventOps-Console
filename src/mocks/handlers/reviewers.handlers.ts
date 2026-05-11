import { http, HttpResponse } from 'msw';
import { GetReviewersResponse } from '@/entities/reviewer/api/contracts';
import { reviewers } from '../db/reviews';
import { userError } from '../utils/httpErrors';
import { isRole } from '@/entities/user/model/typeGuards';

export const reviewersHandlers = [
  http.get('/api/reviewers', ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    if (!userId || !isRole(userRole)) return userError();

    const response: GetReviewersResponse = {
      reviewers: reviewers.map((item) => ({ id: item.id, name: item.name })),
    };

    return HttpResponse.json(response);
  }),
];
