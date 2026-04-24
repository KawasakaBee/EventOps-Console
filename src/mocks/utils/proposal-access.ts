import { ID, Role } from '@/shared/types/primitives.types';
import { reviewers } from '../db/reviews';
import { Proposal } from '@/entities/proposal/model/types';
import { QueryParams } from '@/shared/types/api.types';
import { isOwnedBySpeaker } from './helpers';

export const isManagerLike = (role: Role) =>
  role === 'admin' || role === 'manager';

const isAssignedReviewer = (proposalId: ID, userId: ID) => {
  const reviewer = reviewers.find((item) => item.id === userId);
  return reviewer ? reviewer.proposalIds.includes(proposalId) : false;
};

export type ProposalListAccess =
  | 'all'
  | 'assignedToReviewer'
  | 'ownedBySpeaker'
  | 'forbidden';

export const getProposalsListAccess = (
  role: Role,
  queryParams: QueryParams,
): ProposalListAccess => {
  if (isManagerLike(role)) return 'all';
  if (role === 'reviewer') return 'assignedToReviewer';
  if (role === 'speaker' && queryParams.owner === 'me') return 'ownedBySpeaker';
  return 'forbidden';
};

export const canReadProposal = (
  proposal: Proposal,
  userId: ID,
  role: Role,
): boolean => {
  if (isManagerLike(role)) return true;
  if (role === 'reviewer') return isAssignedReviewer(proposal.id, userId);
  if (role === 'speaker') return isOwnedBySpeaker(proposal.id, userId);
  return false;
};

export const canCreateProposal = (role: Role) => role === 'speaker';

export const canChangeProposal = (
  role: Role,
  proposalId: ID,
  userId: ID,
): boolean => {
  if (role === 'manager') return true;
  if (role === 'speaker') return isOwnedBySpeaker(proposalId, userId);
  return false;
};

export const canCreateReview = (
  role: Role,
  proposalId: ID,
  userId: ID,
): boolean => {
  if (role === 'reviewer') return isAssignedReviewer(proposalId, userId);
  return false;
};

export const canUserCreateComment = (
  role: Role,
  proposalId: ID,
  userId: ID,
): boolean => {
  if (role === 'manager') return true;
  if (role === 'reviewer') return isAssignedReviewer(proposalId, userId);
  return false;
};
