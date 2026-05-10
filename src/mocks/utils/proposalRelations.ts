import { ID } from '@/shared/types/primitives.types';
import { speakers } from '../db/speakers';
import { reviewers } from '../db/reviews';
import { Proposal } from '@/entities/proposal/model/types';

export const isProposalOwnedByUser = (
  proposal: Proposal,
  userId: ID,
): boolean => {
  const speaker = speakers.find((item) => item.userId === userId);

  if (!speaker) return false;

  return proposal.speakerIds.includes(speaker.id);
};

export const isProposalAssignedToReviewer = (proposalId: ID, userId: ID) => {
  const reviewer = reviewers.find((item) => item.id === userId);
  return reviewer ? reviewer.proposalIds.includes(proposalId) : false;
};
