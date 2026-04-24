import {
  Proposal,
  ProposalAction,
  ProposalFormat,
  ProposalLevel,
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { QueryParams } from '@/shared/types/api.types';
import { reviewers } from '../db/reviews';
import { ID, Role } from '@/shared/types/primitives.types';
import { speakers } from '../db/speakers';
import { proposals } from '../db/proposals';
export const proposalsToProposalListItem = (
  proposals: Proposal[],
): ProposalListItem[] =>
  proposals.map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    format: p.format,
    level: p.level,
    trackId: p.trackId,
    updatedAt: p.updatedAt,
  }));

export const parseProposalsListQuery = (requestUrl: string): QueryParams => {
  const url = new URL(requestUrl);

  return {
    page: url.searchParams.get('page')
      ? Number(url.searchParams.get('page'))
      : 1,
    pageSize: url.searchParams.get('pageSize')
      ? Number(url.searchParams.get('pageSize'))
      : 20,
    search: url.searchParams.get('search'),
    status: url.searchParams.getAll('status') as ProposalStatus[],
    trackId: url.searchParams.getAll('trackId'),
    level: url.searchParams.getAll('level') as ProposalLevel[],
    format: url.searchParams.getAll('format') as ProposalFormat[],
    reviewerId: url.searchParams.get('reviewerId'),
    sortBy: url.searchParams.get('sortBy'),
    sortOrder: url.searchParams.get('sortOrder') ?? 'asc',
    owner: url.searchParams.get('owner'),
  };
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

export const applyProposalSort = (
  queryParams: QueryParams,
  proposals: Proposal[],
): Proposal[] => {
  const sortBy = queryParams.sortBy;
  if (!sortBy) return proposals;

  if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
    return proposals.toSorted((a, b) => {
      const aValue = new Date(a[sortBy]).getTime();
      const bValue = new Date(b[sortBy]).getTime();

      return queryParams.sortOrder === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });
  }

  return proposals;
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
): ProposalAction[] => {
  const status = proposal.status;
  const availableActions: ProposalAction[] = [];

  if (role === 'admin' || role === 'manager') {
    if (status === 'submitted')
      availableActions.push(
        'assignReviewer',
        'requestChanges',
        'edit',
        'accept',
        'reject',
        'addComment',
      );
    if (status === 'in_review') {
      availableActions.push('assignReviewer', 'accept', 'reject', 'addComment');
    }
    if (status === 'changes_requested') {
      availableActions.push('accept', 'reject', 'addComment');
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
