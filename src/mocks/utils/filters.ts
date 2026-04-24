import { ID } from '@/shared/types/primitives.types';
import { proposals } from '../db/proposals';
import { Proposal } from '@/entities/proposal/model/types';
import { Speaker } from '@/entities/speaker/model/types';
import { speakers } from '../db/speakers';
import { reviewers, reviews } from '../db/reviews';
import { Review } from '@/entities/review/model/types';
import { Comment } from '@/entities/comment/model/types';
import { comments } from '../db/comments';
import { HistoryEntry } from '@/entities/history/model/types';
import { history } from '../db/history';
import { QueryParams } from '@/shared/types/api.types';
import { ProposalListAccess } from './proposal-access';
import { isOwnedBySpeaker } from './helpers';

export const getProposalById = (id: ID): Proposal | undefined =>
  proposals.find((proposal) => proposal.id === id);

export const getSpeakersById = (ids: ID[]): Speaker[] =>
  speakers.filter((speaker) => ids.includes(speaker.id));

export const getReviewsByProposalId = (id: ID): Review[] =>
  reviews.filter((review) => review.proposalId === id);

export const getCommentsByProposalId = (id: ID): Comment[] =>
  comments.filter((comment) => comment.proposalId === id);

export const getHistoryByProposalId = (id: ID): HistoryEntry[] =>
  history.filter((hstr) => hstr.proposalId === id);

export const applyProposalFilters = (
  queryParams: QueryParams,
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

  return proposals.filter((proposal) => {
    return (
      (!statusSet || statusSet.has(proposal.status)) &&
      (!trackSet || trackSet.has(proposal.trackId)) &&
      (!levelSet || levelSet.has(proposal.level)) &&
      (!formatSet || formatSet.has(proposal.format))
    );
  });
};

export const filterProposalListByAccess = (
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
      isOwnedBySpeaker(proposal.id, userId),
    );
  }
  return proposals;
};
