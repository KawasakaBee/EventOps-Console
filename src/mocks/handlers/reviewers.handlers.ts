import { isRole } from '@/shared/utils/typeGuards';
import { http, HttpResponse } from 'msw';
import { userError } from '../db/errors';
import { GetReviewersResponse } from '@/shared/api/contracts/reviewer.contract';
import { reviewers } from '../db/reviews';

export const reviewersHandlers = [
  http.get('/api/reviewers', ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    if (!userId || !isRole(userRole)) return userError;

    const response: GetReviewersResponse = {
      reviewers: reviewers.map((item) => ({ id: item.id, name: item.name })),
    };

    return HttpResponse.json(response);
  }),
];
