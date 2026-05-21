import { ID } from '@/shared/types/primitives.types';
import { reviewers } from '../db/reviews';
import { Proposal } from '@/entities/proposal/model/types';
import { users } from '../db/users';
import { speakers } from '../db/speakers';

export const isProposalOwnedByUser = (
  proposal: Proposal,
  userId: ID,
): boolean => {
  const user = users.find((item) => item.id === userId);

  if (!user || user.role !== 'speaker') return false;

  const speaker = speakers.find((item) => item.id === user.speakerId);

  if (!speaker) return false;

  return proposal.ownerId === speaker.id;
};

export const isProposalAssignedToReviewer = (proposalId: ID, userId: ID) => {
  const reviewer = reviewers.find((item) => item.id === userId);
  return reviewer ? reviewer.proposalIds.includes(proposalId) : false;
};
