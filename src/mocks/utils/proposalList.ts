import { Proposal, ProposalListItem } from '@/entities/proposal/model/types';
import { reviews } from '../db/reviews';
import { ID } from '@/shared/types/primitives.types';
import { ProposalListQuery } from '@/entities/proposal/model/query';
import getAvailableProposalStatuses from './proposalStatusTransitions';

export const mapProposalsToListItems = (
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
    availableStatuses: getAvailableProposalStatuses(
      p.status,
      foundReviewsCount(p.id),
    ),
  }));
};

export const paginateProposals = (
  queryParams: ProposalListQuery,
  proposals: Proposal[],
): Proposal[] => {
  const start = (queryParams.page - 1) * queryParams.pageSize;
  const end = start + queryParams.pageSize;

  const slicedProposals = proposals.slice(start, end);

  return slicedProposals;
};
