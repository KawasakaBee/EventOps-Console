import {
  Proposal,
  ProposalAction,
  ProposalListItem,
} from '@/entities/proposal/model/types';
import { QueryParams } from '@/shared/types/api.types';
import { reviewers, reviews } from '../db/reviews';
import { ID, Role } from '@/shared/types/primitives.types';
import { speakers } from '../db/speakers';
import { proposals } from '../db/proposals';
import getAvailableStatusesToChange from './getAvailableStatusesToChange';

export const proposalsToProposalListItem = (
  proposals: Proposal[],
): ProposalListItem[] => {
  const foundReviewsCount = (id: ID) =>
    reviews.filter((review) => review.proposalId === id).length;

  return proposals.map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    format: p.format,
    level: p.level,
    trackId: p.trackId,
    updatedAt: p.updatedAt,
    availableStatuses: getAvailableStatusesToChange(
      p.status,
      foundReviewsCount(p.id),
    ),
  }));
};

export const applyProposalSearch = (
  queryParams: QueryParams,
  proposals: Proposal[],
) => {
  const search = queryParams.search;
  if (!search) return proposals;
  return proposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(search.toLowerCase()),
  );
};

export const paginateProposals = (
  queryParams: QueryParams,
  proposals: Proposal[],
): Proposal[] => {
  const start = (queryParams.page - 1) * queryParams.pageSize;
  const end = start + queryParams.pageSize;

  const slicedProposals = proposals.slice(start, end);

  return slicedProposals;
};

export const isOwnedBySpeaker = (proposalId: ID, userId: ID): boolean => {
  const speaker = speakers.find((item) => item.userId === userId);
  const proposal = proposals.find((proposal) => proposal.id === proposalId);

  if (!speaker || !proposal) return false;

  return proposal.speakerIds.includes(speaker.id);
};

export const isAssignedReviewer = (proposalId: ID, userId: ID): boolean => {
  const reviewer = reviewers.find((item) => item.id === userId);
  if (reviewer && reviewer.proposalIds.includes(proposalId)) return true;
  return false;
};

export const getAvailableProposalActions = (
  role: Role,
  proposal: Proposal,
  userId: ID,
  reviewerCount: number,
): ProposalAction[] => {
  const status = proposal.status;
  const availableActions: ProposalAction[] = [];

  if (role === 'admin' || role === 'manager') {
    if (status === 'submitted') {
      availableActions.push(
        'assignReviewer',
        'edit',
        'addComment',
        'changeStatus',
      );
    }
    if (status === 'in_review') {
      availableActions.push('assignReviewer', 'addComment', 'changeStatus');
      if (reviewerCount !== 0) {
        availableActions.push('accept', 'reject');
      }
    }
    if (status === 'changes_requested') {
      availableActions.push('addComment', 'changeStatus');
      if (reviewerCount !== 0) {
        availableActions.push('accept', 'reject');
      }
    }
    if (status === 'accepted') availableActions.push('schedule');
  }

  if (role === 'reviewer') {
    if (!isAssignedReviewer(proposal.id, userId)) return [];

    if (status === 'submitted' || status === 'in_review')
      availableActions.push('addComment', 'addReview');
  }

  if (role === 'speaker') {
    if (!isOwnedBySpeaker(proposal.id, userId)) return [];

    if (status === 'draft' || status === 'changes_requested')
      availableActions.push('edit', 'submit');
  }

  return availableActions;
};
