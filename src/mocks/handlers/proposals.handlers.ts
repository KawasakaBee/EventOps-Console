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
  PatchProposalRequest,
  PatchProposalResponse,
  PatchProposalStatusRequest,
  PatchProposalStatusResponse,
  PostAssignReviewerRequest,
  PostAssignReviewerResponse,
  PostCreateCommentRequest,
  PostCreateCommentResponse,
  PostCreateReviewRequest,
  PostCreateReviewResponse,
  PostProposalRequest,
  PostProposalResponse,
} from '@/shared/api/contracts/proposal.contract';
import {
  applyProposalFilters,
  filterProposalListByAccess,
  getCommentsByProposalId,
  getHistoryByProposalId,
  getProposalById,
  getReviewsByProposalId,
  getSpeakersById,
} from '../utils/filters';
import { ErrorEnvelope } from '@/shared/types/api.types';
import { ID, Role } from '@/shared/types/primitives.types';
import { appendProposalHistory } from '../db/history';
import { assignReviewer, createReview, reviewers } from '../db/reviews';
import { createComment } from '../db/comments';
import {
  applyProposalSearch,
  paginateProposals,
  parseProposalsListQuery,
  proposalsToProposalListItem,
  applyProposalSort,
  getAvailableProposalActions,
} from '../utils/helpers';
import {
  canChangeProposal,
  canCreateProposal,
  canCreateReview,
  canReadProposal,
  canUserCreateComment,
  getProposalsListAccess,
  isManagerLike,
} from '../utils/proposal-access';

const userError = HttpResponse.json(
  {
    error: {
      code: 'USER_NOT_FOUND',
      message: 'Пользователь не найден',
    },
  } as ErrorEnvelope,
  { status: 404 },
);

const proposalError = HttpResponse.json(
  {
    error: {
      code: 'PROPOSAL_NOT_FOUND',
      message: 'Заявка не найдена',
    },
  } as ErrorEnvelope,
  { status: 404 },
);

const forbiddenError = HttpResponse.json(
  {
    error: {
      code: 'FORBIDDEN',
      message: 'Доступ запрещён',
    },
  } as ErrorEnvelope,
  { status: 403 },
);

const reviewerError = HttpResponse.json(
  {
    error: {
      code: 'REVIEWER_NOT_FOUND',
      message: 'Ревьюер не найден',
    },
  } as ErrorEnvelope,
  { status: 404 },
);

export const proposalHandlers = [
  http.get('/api/proposals', async ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    let result = proposals;

    if (!userId || !userRole) return userError;

    const queryParams = parseProposalsListQuery(request.url);
    const access = getProposalsListAccess(userRole as Role, queryParams);

    if (access === 'forbidden') return forbiddenError;

    result = filterProposalListByAccess(userId, result, access);
    result = applyProposalSearch(queryParams, result);
    result = applyProposalFilters(queryParams, result);
    result = applyProposalSort(queryParams, result);

    const total = result.length;

    result = paginateProposals(queryParams, result);
    const proposalsListItem = proposalsToProposalListItem(result);

    const response: GetProposalsListResponse = {
      items: proposalsListItem,
      page: queryParams.page,
      pageSize: queryParams.pageSize,
      total,
      totalPages: Math.ceil(total / queryParams.pageSize),
    };

    return HttpResponse.json(response);
  }),

  http.get('/api/proposals/:id', ({ request, params }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');
    const id = params.id as ID;

    if (!userId || !userRole) return userError;

    const proposal = getProposalById(id);
    if (!proposal) return proposalError;

    const isUserHaveAccess = canReadProposal(
      proposal,
      userId,
      userRole as Role,
    );

    if (!isUserHaveAccess) return forbiddenError;

    const speakers = getSpeakersById(proposal.speakerIds);
    const reviews = getReviewsByProposalId(proposal.id);
    const comments = getCommentsByProposalId(proposal.id);
    const history = getHistoryByProposalId(proposal.id);

    const availableActions = getAvailableProposalActions(
      userRole as Role,
      proposal,
      userId,
    );
    if (!availableActions) return forbiddenError;

    const response: GetProposalResponse = {
      proposal: proposal,
      speakers: speakers,
      reviews: reviews,
      comments: comments,
      history: history,
      availableActions,
    };

    return HttpResponse.json(response);
  }),

  http.post('/api/proposals', async ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');
    const body = (await request.json()) as PostProposalRequest;

    if (!userId || !userRole) return userError;

    const isUserCanCreateProposal = canCreateProposal(userRole as Role);
    if (!isUserCanCreateProposal) return forbiddenError;

    const response: PostProposalResponse = {
      proposal: createProposal(body, userId),
    };

    return HttpResponse.json(response, { status: 201 });
  }),

  http.patch('/api/proposals/:id', async ({ request, params }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');
    const id = params.id as ID;
    const body = (await request.json()) as PatchProposalRequest;

    if (!userId || !userRole) return userError;

    const isUserCanChangeProposal = canChangeProposal(
      userRole as Role,
      id,
      userId,
    );
    if (!isUserCanChangeProposal) return forbiddenError;

    const history = appendProposalHistory(id, userId, body, 'updated');
    if (!history) return proposalError;

    const proposal = updateProposal(id, body);
    if (!proposal) return proposalError;

    const response: PatchProposalResponse = {
      proposal: proposal,
    };

    return HttpResponse.json(response);
  }),

  http.patch('/api/proposals/:id/status', async ({ request, params }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');
    const id = params.id as ID;
    const { status, reason } =
      (await request.json()) as PatchProposalStatusRequest;

    if (!userId || !userRole) return userError;

    const canUserChangeProposalStatus = isManagerLike(userRole as Role);
    if (!canUserChangeProposalStatus) return forbiddenError;

    const history = appendProposalHistory(
      id,
      userId,
      { status },
      'status_changed',
      { reason },
    );
    if (!history) return proposalError;

    const proposal = updateProposalStatus(id, status);
    if (!proposal) return proposalError;

    const response: PatchProposalStatusResponse = {
      proposal: proposal,
      historyEntry: history,
    };

    return HttpResponse.json(response);
  }),

  http.post(
    '/api/proposals/:id/assign-reviewer',
    async ({ request, params }) => {
      const userId = request.headers.get('x-demo-user-id');
      const userRole = request.headers.get('x-demo-user-role');
      const id = params.id as ID;
      const { reviewerId } =
        (await request.json()) as PostAssignReviewerRequest;

      if (!userId || !userRole) return userError;

      const reviewer = reviewers.find((item) => item.id === reviewerId);
      if (!reviewer) return reviewerError;

      const proposal = proposals.find((proposal) => proposal.id === id);
      if (!proposal) return proposalError;

      const canUserChangeProposalStatus = isManagerLike(userRole as Role);
      if (!canUserChangeProposalStatus) return forbiddenError;

      assignReviewer(id, reviewerId);

      const response: PostAssignReviewerResponse = {
        proposalId: id,
        reviewerId,
      };

      return HttpResponse.json(response);
    },
  ),

  http.post('/api/proposals/:id/reviews', async ({ request, params }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');
    const id = params.id as ID;
    const body = (await request.json()) as PostCreateReviewRequest;

    if (!userId || !userRole) return userError;

    const isUserCanCreateReview = canCreateReview(userRole as Role, id, userId);
    if (!isUserCanCreateReview) return forbiddenError;

    const review = createReview(id, userId, body);

    const response: PostCreateReviewResponse = {
      review,
      aggregatedScores:
        review.scoreContent + review.scoreDelivery + review.scoreRelevance,
    };

    return HttpResponse.json(response);
  }),

  http.post('/api/proposals/:id/comments', async ({ request, params }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');
    const id = params.id as ID;
    const { message } = (await request.json()) as PostCreateCommentRequest;

    if (!userId || !userRole) return userError;

    const isUserCanCreateComment = canUserCreateComment(
      userRole as Role,
      id,
      userId,
    );
    if (!isUserCanCreateComment) return forbiddenError;

    const comment = createComment(id, userId, userRole as Role, message);

    const response: PostCreateCommentResponse = {
      comment,
    };

    return HttpResponse.json(response);
  }),
];
