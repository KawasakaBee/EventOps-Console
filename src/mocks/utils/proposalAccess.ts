import { ID } from '@/shared/types/primitives.types';
import { Role } from '@/entities/user/model/types';
import {
  isProposalAssignedToReviewer,
  isProposalOwnedByUser,
} from './proposalRelations';
import { proposals } from '../db/proposals';

export const isManagerLike = (role: Role) =>
  role === 'admin' || role === 'manager';

export type ProposalListAccess =
  | 'all'
  | 'assignedToReviewer'
  | 'ownedBySpeaker'
  | 'forbidden';

export const getProposalsListAccess = (
  role: Role,
  ownerParam: string | null,
): ProposalListAccess => {
  if (isManagerLike(role)) return 'all';
  if (role === 'reviewer') return 'assignedToReviewer';
  if (role === 'speaker' && ownerParam === 'me') return 'ownedBySpeaker';
  return 'forbidden';
};

export const canReadProposal = (
  role: Role,
  userId: ID,
  params: {
    proposalId: ID;
    ownerId: ID;
  },
): boolean => {
  const { proposalId, ownerId } = params;

  if (isManagerLike(role)) return true;
  if (role === 'reviewer')
    return isProposalAssignedToReviewer(proposalId, userId);
  if (role === 'speaker') return isProposalOwnedByUser(ownerId, userId);
  return false;
};

export const canCreateProposal = (role: Role) => role === 'speaker';

export const canChangeProposal = (
  role: Role,
  proposalId: ID,
  userId: ID,
): boolean => {
  const proposal = proposals.find((proposal) => proposal.id === proposalId);
  if (!proposal) return false;
  if (isManagerLike(role)) return true;
  if (role === 'speaker')
    return proposal.status === 'draft'
      ? isProposalOwnedByUser(proposal.ownerId, userId)
      : false;
  return false;
};

export const canCreateReview = (
  role: Role,
  proposalId: ID,
  userId: ID,
): boolean => {
  if (role === 'reviewer')
    return isProposalAssignedToReviewer(proposalId, userId);
  return false;
};

export const canUserCreateComment = (
  role: Role,
  proposalId: ID,
  userId: ID,
): boolean => {
  if (isManagerLike(role)) return true;
  if (role === 'reviewer')
    return isProposalAssignedToReviewer(proposalId, userId);
  return false;
};
