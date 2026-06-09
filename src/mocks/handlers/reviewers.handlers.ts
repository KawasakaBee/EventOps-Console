import { http, HttpResponse } from 'msw';
import { GetReviewersResponse } from '@/entities/reviewer/api/contracts';
import { forbiddenError, unauthorizedError } from '../utils/httpErrors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { getUserById } from '@/entities/user/lib/userSelectors';
import { reviewers } from '../db/reviews';
import { users } from '../db/users';
import { isManagerLike } from '../utils/proposalAccess';

export const reviewersHandlers = [
  http.get('/api/reviewers', ({ cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();
    if (!isManagerLike(user.role)) return forbiddenError();

    const response: GetReviewersResponse = {
      reviewers: reviewers
        .filter((reviewer) => {
          const reviewerUser = users.find((user) => user.id === reviewer.id);
          if (!reviewerUser) return false;

          return reviewerUser.eventIds.some((eventId) =>
            user.eventIds.includes(eventId),
          );
        })
        .map((item) => {
          const eventIds =
            users.find((user) => user.id === item.id)?.eventIds ?? [];
          return { id: item.id, name: item.name, eventIds };
        }),
    };

    return HttpResponse.json(response);
  }),
];
