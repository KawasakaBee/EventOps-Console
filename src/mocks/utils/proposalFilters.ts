import { ProposalListQuery } from '@/entities/proposal/model/query';
import { Proposal } from '@/entities/proposal/model/types';
import { reviewers } from '../db/reviews';
import { ID } from '@/shared/types/primitives.types';
import { ProposalListAccess } from './proposalAccess';
import { isProposalOwnedByUser } from './proposalRelations';

export const applyProposalSearch = (
  queryParams: ProposalListQuery,
  proposals: Proposal[],
) => {
  const search = queryParams.search;
  if (!search) return proposals;
  const normalizedSearch = search.trim().toLowerCase();
  return proposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(normalizedSearch),
  );
};

export const applyProposalFilters = (
  queryParams: ProposalListQuery,
  proposals: Proposal[],
): Proposal[] => {
  const statusSet = queryParams.status.length
    ? new Set(queryParams.status)
    : null;
  const trackSet = queryParams.trackId.length
    ? new Set(queryParams.trackId)
    : null;
  const levelSet = queryParams.level.length ? new Set(queryParams.level) : null;
  const formatSet = queryParams.format.length
    ? new Set(queryParams.format)
    : null;
  const reviewer = reviewers.find((item) => item.id === queryParams.reviewerId);
  const reviewerSet = reviewer ? new Set(reviewer.proposalIds) : null;

  if (queryParams.reviewerId && !reviewer) return [];

  return proposals.filter((proposal) => {
    return (
      (!statusSet || statusSet.has(proposal.status)) &&
      (!trackSet || trackSet.has(proposal.trackId)) &&
      (!levelSet || levelSet.has(proposal.level)) &&
      (!formatSet || formatSet.has(proposal.format)) &&
      (!reviewerSet || reviewerSet.has(proposal.id))
    );
  });
};

export const applyProposalAccessFilter = (
  userId: ID,
  proposals: Proposal[],
  access: ProposalListAccess,
): Proposal[] => {
  if (access === 'assignedToReviewer') {
    const reviewer = reviewers.find((item) => item.id === userId);
    if (reviewer) {
      return proposals.filter((proposal) =>
        reviewer.proposalIds.includes(proposal.id),
      );
    }
  }
  if (access === 'ownedBySpeaker') {
    return proposals.filter((proposal) =>
      isProposalOwnedByUser(proposal, userId),
    );
  }
  return proposals;
};
