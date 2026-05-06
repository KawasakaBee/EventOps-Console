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
import { appendProposalHistory } from '../db/history';
import { assignReviewer, createReview, reviewers } from '../db/reviews';
import { createComment } from '../db/comments';
import {
  applyProposalSearch,
  paginateProposals,
  proposalsToProposalListItem,
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
import { isId, isProposalStatus, isRole } from '@/shared/utils/typeGuards';
import {
  forbiddenError,
  proposalError,
  reviewerError,
  userError,
} from '../db/errors';
import { applyProposalSort } from '../utils/sort';
import { parseProposalsListQuery } from '@/entities/proposal/lib/parseProposalsListQuery';
import getAvailableStatusesToChange from '@/shared/utils/getAvailableStatusesToChange';

export const proposalHandlers = [
  http.get('/api/proposals', async ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    let result = proposals;

    if (!userId || !isRole(userRole)) return userError();

    const queryParams = parseProposalsListQuery(request.url);
    const access = getProposalsListAccess(userRole, queryParams);

    if (access === 'forbidden') return forbiddenError();

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
    const id = params.id;

    if (!userId || !isRole(userRole)) return userError();
    if (!isId(id)) return proposalError();

    const proposal = getProposalById(id);
    if (!proposal) return proposalError();

    const isUserHaveAccess = canReadProposal(proposal, userId, userRole);

    if (!isUserHaveAccess) return forbiddenError();

    const speakers = getSpeakersById(proposal.speakerIds);
    const reviews = getReviewsByProposalId(proposal.id);
    const comments = getCommentsByProposalId(proposal.id);
    const history = getHistoryByProposalId(proposal.id);

    const availableActions = getAvailableProposalActions(
      userRole,
      proposal,
      userId,
    );
    if (!availableActions) return forbiddenError();

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
    const body = (await request.json()) as PostProposalRequest; //Провалидировать

    if (!userId || !isRole(userRole)) return userError();

    const isUserCanCreateProposal = canCreateProposal(userRole);
    if (!isUserCanCreateProposal) return forbiddenError();

    const response: PostProposalResponse = {
      proposal: createProposal(body, userId),
    };

    return HttpResponse.json(response, { status: 201 });
  }),

  http.patch('/api/proposals/:id', async ({ request, params }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');
    const id = params.id;
    const body = (await request.json()) as PatchProposalRequest; //Провалидировать

    if (!userId || !isRole(userRole)) return userError();
    if (!isId(id)) return proposalError();

    const isUserCanChangeProposal = canChangeProposal(userRole, id, userId);
    if (!isUserCanChangeProposal) return forbiddenError();

    const history = appendProposalHistory(id, userId, body, 'updated');
    if (!history) return proposalError();

    const proposal = updateProposal(id, body);
    if (!proposal) return proposalError();

    const response: PatchProposalResponse = {
      proposal: proposal,
    };

    return HttpResponse.json(response);
  }),

  http.patch('/api/proposals/:id/status', async ({ request, params }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');
    const id = params.id;
    const { status, reason } =
      (await request.json()) as PatchProposalStatusRequest; //Провалидировать

    if (!userId || !isRole(userRole)) return userError();
    if (!isId(id)) return proposalError();

    if (!isProposalStatus(status)) return forbiddenError();

    const prevProposal = proposals.find((proposal) => proposal.id === id);
    if (!prevProposal) return proposalError();

    const canUserChangeProposalStatus = isManagerLike(userRole);
    if (!canUserChangeProposalStatus) return forbiddenError();

    const availableStatuses = getAvailableStatusesToChange(prevProposal.status);

    if (!availableStatuses.includes(status)) return forbiddenError();

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

    const availableActions = getAvailableProposalActions(
      userRole,
      proposal,
      userId,
    );
    if (!availableActions) return forbiddenError();

    const response: PatchProposalStatusResponse = {
      proposal: proposal,
      historyEntry: history,
      availableActions,
    };

    return HttpResponse.json(response);
  }),

  http.post(
    '/api/proposals/:id/assign-reviewer',
    async ({ request, params }) => {
      const userId = request.headers.get('x-demo-user-id');
      const userRole = request.headers.get('x-demo-user-role');
      const id = params.id;
      const { reviewerId } =
        (await request.json()) as PostAssignReviewerRequest; //Провалидировать

      if (!userId || !isRole(userRole)) return userError();
      if (!isId(id)) return proposalError();

      const reviewer = reviewers.find((item) => item.id === reviewerId);
      if (!reviewer) return reviewerError();

      const proposal = proposals.find((proposal) => proposal.id === id);
      if (!proposal) return proposalError();

      const canUserChangeProposalStatus = isManagerLike(userRole);
      if (!canUserChangeProposalStatus) return forbiddenError();

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
    const id = params.id;
    const body = (await request.json()) as PostCreateReviewRequest; //Провалидировать

    if (!userId || !isRole(userRole)) return userError();
    if (!isId(id)) return proposalError();

    const isUserCanCreateReview = canCreateReview(userRole, id, userId);
    if (!isUserCanCreateReview) return forbiddenError();

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
    const id = params.id;
    const { message } = (await request.json()) as PostCreateCommentRequest; //Провалидировать

    if (!userId || !isRole(userRole)) return userError();
    if (!isId(id)) return proposalError();

    const isUserCanCreateComment = canUserCreateComment(userRole, id, userId);
    if (!isUserCanCreateComment) return forbiddenError();

    const comment = createComment(id, userId, userRole, message);

    const response: PostCreateCommentResponse = {
      comment,
    };

    return HttpResponse.json(response);
  }),
];
