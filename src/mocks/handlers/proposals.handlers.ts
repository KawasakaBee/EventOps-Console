import { http, HttpResponse } from 'msw';
import {
  createProposal,
  proposals,
  updateProposal,
  updateProposalStatus,
} from '../db/proposals';
import {
  GetProposalResponse,
  GetProposalsListResponse,
  PatchProposalResponse,
  PatchProposalStatusRequest,
  PatchProposalStatusResponse,
  PostAssignReviewerRequest,
  PostAssignReviewerResponse,
  PostCreateCommentResponse,
  PostCreateReviewResponse,
  PostProposalResponse,
} from '@/entities/proposal/api/contracts';
import {
  appendAdditionalHistory,
  appendProposalHistory,
  createHistory,
} from '../db/history';
import {
  assignReviewer,
  createReview,
  reviewers,
  reviews,
} from '../db/reviews';
import { createComment } from '../db/comments';
import { isId } from '@/shared/utils/typeGuards';
import { applyProposalSort } from '../utils/proposalSort';
import { parseProposalsListQuery } from '@/entities/proposal/lib/parseProposalsListQuery';
import {
  forbiddenError,
  proposalError,
  queryError,
  reviewerError,
  unauthorizedError,
  validationError,
} from '../utils/httpErrors';
import {
  paginateProposals,
  mapProposalsToListItems,
} from '../utils/proposalList';
import {
  applyProposalAccessFilter,
  applyProposalFilters,
  applyProposalSearch,
} from '../utils/proposalFilters';
import {
  getCommentsByProposalId,
  getHistoryByProposalId,
  getProposalById,
  getReviewsByProposalId,
  getSpeakersByIds,
} from '../utils/proposalSelectors';
import { getAvailableProposalActions } from '../utils/proposalActions';
import {
  canChangeProposal,
  canCreateProposal,
  canCreateReview,
  canReadProposal,
  canUserCreateComment,
  getProposalsListAccess,
  isManagerLike,
} from '../utils/proposalAccess';
import getAvailableProposalStatuses from '../utils/proposalStatusTransitions';
import { isProposalStatus } from '@/entities/proposal/model/typeGuards';
import {
  patchProposalRequestSchema,
  postProposalRequestSchema,
} from '@/entities/proposal/api/schema';
import zodErrorParse from '../utils/zodErrorParse';
import mapProposalRequestToProposalBody from '../utils/mapProposalRequestToProposalBody';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { getUserById } from '@/entities/user/lib/userSelectors';
import isHistoryValueEqual from '../utils/isHistoryValueEqual';
import { createReviewSchema } from '@/entities/review/api/schema';
import { addCommentSchema } from '@/entities/comment/api/schema';

export const proposalHandlers = [
  http.get('/api/proposals', async ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const userRole = user.role;

    let result = proposals;

    const queryParams = parseProposalsListQuery(request.url);
    const access = getProposalsListAccess(userRole, queryParams.owner);

    if (access === 'forbidden') return forbiddenError();

    result = applyProposalAccessFilter(userId, result, access);
    result = applyProposalSearch(queryParams, result);
    result = applyProposalFilters(queryParams, result);
    result = applyProposalSort(queryParams, result);

    const total = result.length;

    result = paginateProposals(queryParams, result);
    const proposalsListItem = mapProposalsToListItems(result, user.role);

    const response: GetProposalsListResponse = {
      items: proposalsListItem,
      page: queryParams.page,
      pageSize: queryParams.pageSize,
      total,
      totalPages: Math.ceil(total / queryParams.pageSize),
    };

    return HttpResponse.json(response);
  }),

  http.get('/api/proposals/:id', ({ params, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const userRole = user.role;
    const id = params.id;

    if (!isId(id)) return proposalError();

    const proposal = getProposalById(id);
    if (!proposal) return proposalError();

    const isUserHaveAccess = canReadProposal(userRole, userId, {
      proposalId: proposal.id,
      ownerId: proposal.ownerId,
    });

    if (!isUserHaveAccess) return forbiddenError();

    const speakers = getSpeakersByIds(proposal.speakerIds);
    const reviews = getReviewsByProposalId(proposal.id);
    const comments = getCommentsByProposalId(proposal.id);
    const history = getHistoryByProposalId(proposal.id);

    const availableActions = getAvailableProposalActions(
      userRole,
      {
        status: proposal.status,
        proposalId: proposal.id,
        ownerId: proposal.ownerId,
      },
      userId,
      reviews.length,
    );
    if (!availableActions) return forbiddenError();

    const availableStatuses = getAvailableProposalStatuses(
      proposal.status,
      reviews.length,
      user.role,
    );

    const response: GetProposalResponse = {
      proposal: proposal,
      speakers: speakers,
      reviews: reviews,
      comments: comments,
      history: history,
      availableActions,
      availableStatuses,
    };

    return HttpResponse.json(response);
  }),

  http.post('/api/proposals', async ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const userRole = user.role;

    const isUserCanCreateProposal = canCreateProposal(userRole);
    if (!isUserCanCreateProposal) return forbiddenError();

    const rawBody: unknown = await request.json();

    const parsedBody = postProposalRequestSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      const errorBody = zodErrorParse(parsedBody.error);
      return validationError(errorBody);
    }

    const body = parsedBody.data;

    if (user.role !== 'speaker') return forbiddenError();
    if (!user.speakerId) return forbiddenError();

    const proposal = createProposal(body, user.speakerId);

    const response: PostProposalResponse = { proposal };
    createHistory(proposal.id, userId, 'created');

    return HttpResponse.json(response, { status: 201 });
  }),

  http.patch('/api/proposals/:id', async ({ request, params, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const userRole = user.role;
    const id = params.id;

    if (!isId(id)) return proposalError();

    const isUserCanChangeProposal = canChangeProposal(userRole, id, userId);
    if (!isUserCanChangeProposal) return forbiddenError();

    const rawBody: unknown = await request.json();

    const parsedBody = patchProposalRequestSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      const errorBody = zodErrorParse(parsedBody.error);
      return validationError(errorBody);
    }

    const body = parsedBody.data;

    const prevProposal = getProposalById(id);
    if (!prevProposal) return proposalError();

    const proposalBody = mapProposalRequestToProposalBody(
      body,
      prevProposal.ownerId,
    );

    const isStatusChanged =
      body.status !== undefined &&
      !isHistoryValueEqual(prevProposal.status, body.status);

    const historyAction = isStatusChanged ? 'status_changed' : 'updated';

    appendProposalHistory(id, userId, proposalBody, historyAction);

    const proposal = updateProposal(id, proposalBody);
    if (!proposal) return proposalError();

    const response: PatchProposalResponse = {
      proposal: proposal,
    };

    return HttpResponse.json(response);
  }),

  http.patch(
    '/api/proposals/:id/status',
    async ({ request, params, cookies }) => {
      const userId = cookies[AUTH_SESSION_COOKIE];
      const user = getUserById(userId);

      if (!user) return unauthorizedError();

      const userRole = user.role;
      const id = params.id;
      const { status, reason } =
        (await request.json()) as PatchProposalStatusRequest; //Провалидировать

      if (!isId(id)) return proposalError();

      if (!isProposalStatus(status)) return queryError();

      const prevProposal = proposals.find((proposal) => proposal.id === id);
      if (!prevProposal) return proposalError();

      const canUserChangeProposalStatus = isManagerLike(userRole);
      if (!canUserChangeProposalStatus) return forbiddenError();

      const foundPrevReviewsCount = reviews.filter(
        (review) => review.proposalId === prevProposal.id,
      ).length;

      const prevAvailableStatuses = getAvailableProposalStatuses(
        prevProposal.status,
        foundPrevReviewsCount,
        user.role,
      );

      if (!prevAvailableStatuses.includes(status)) return forbiddenError();

      if (
        (status === 'rejected' || status === 'changes_requested') &&
        !reason?.trim()
      )
        return forbiddenError();

      const history = appendProposalHistory(
        id,
        userId,
        { status },
        'status_changed',
        { reason },
      );
      if (!history) return proposalError();

      const proposal = updateProposalStatus(id, status);
      if (!proposal) return proposalError();

      const foundNextReviewsCount = reviews.filter(
        (review) => review.proposalId === proposal.id,
      ).length;

      const availableActions = getAvailableProposalActions(
        userRole,
        {
          status: proposal.status,
          proposalId: proposal.id,
          ownerId: proposal.ownerId,
        },
        userId,
        foundNextReviewsCount,
      );
      if (!availableActions) return forbiddenError();

      const availableStatuses = getAvailableProposalStatuses(
        proposal.status,
        foundNextReviewsCount,
        user.role,
      );

      const response: PatchProposalStatusResponse = {
        proposal: proposal,
        historyEntry: history,
        availableActions,
        availableStatuses,
      };

      return HttpResponse.json(response);
    },
  ),

  http.post(
    '/api/proposals/:id/assign-reviewer',
    async ({ request, params, cookies }) => {
      const userId = cookies[AUTH_SESSION_COOKIE];
      const user = getUserById(userId);

      if (!user) return unauthorizedError();

      const userRole = user.role;
      const id = params.id;
      const { reviewerId } =
        (await request.json()) as PostAssignReviewerRequest; //Провалидировать

      if (!isId(id)) return proposalError();

      const reviewer = reviewers.find((item) => item.id === reviewerId);
      if (!reviewer) return reviewerError();

      const proposal = proposals.find((proposal) => proposal.id === id);
      if (!proposal) return proposalError();

      const canUserChangeProposalStatus = isManagerLike(userRole);
      if (!canUserChangeProposalStatus) return forbiddenError();

      if (proposal.status !== 'submitted' && proposal.status !== 'in_review')
        return forbiddenError();

      assignReviewer(id, reviewer);
      appendAdditionalHistory(id, userId, 'reviewer_assigned', {
        reviewerId: reviewer.id,
      });

      const response: PostAssignReviewerResponse = {
        proposalId: id,
        reviewerId,
      };

      return HttpResponse.json(response);
    },
  ),

  http.post(
    '/api/proposals/:id/reviews',
    async ({ request, params, cookies }) => {
      const userId = cookies[AUTH_SESSION_COOKIE];
      const user = getUserById(userId);

      if (!user) return unauthorizedError();

      const userRole = user.role;
      const id = params.id;
      if (!isId(id)) return proposalError();

      const bodyRaw = await request.json();
      const parsedBody = createReviewSchema.safeParse(bodyRaw);

      if (!parsedBody.success) {
        const errorBody = zodErrorParse(parsedBody.error);
        return validationError(errorBody);
      }

      const body = parsedBody.data;

      const isUserCanCreateReview = canCreateReview(userRole, id, userId);
      if (!isUserCanCreateReview) return forbiddenError();

      const review = createReview(id, userId, body);
      const history = appendAdditionalHistory(id, userId, 'review_added', {
        reviewId: review.id,
        recommendation: review.recommendation,
      });

      if (!history) return proposalError();

      const response: PostCreateReviewResponse = {
        review,
        history,
        aggregatedScores:
          review.scoreContent + review.scoreDelivery + review.scoreRelevance,
      };

      return HttpResponse.json(response, { status: 201 });
    },
  ),

  http.post(
    '/api/proposals/:id/comments',
    async ({ request, params, cookies }) => {
      const userId = cookies[AUTH_SESSION_COOKIE];
      const user = getUserById(userId);

      if (!user) return unauthorizedError();

      const userRole = user.role;
      const id = params.id;
      if (!isId(id)) return proposalError();

      const bodyRaw = await request.json();

      const parsedBody = addCommentSchema.safeParse(bodyRaw);

      if (!parsedBody.success) {
        const errorBody = zodErrorParse(parsedBody.error);
        return validationError(errorBody);
      }

      const body = parsedBody.data;

      const isUserCanCreateComment = canUserCreateComment(userRole, id, userId);
      if (!isUserCanCreateComment) return forbiddenError();

      const comment = createComment(id, userId, userRole, body.message);
      const history = appendAdditionalHistory(id, userId, 'comment_added', {
        commentId: comment.id,
      });

      if (!history) return proposalError();

      const response: PostCreateCommentResponse = {
        comment,
        history,
      };

      return HttpResponse.json(response, { status: 201 });
    },
  ),
];
