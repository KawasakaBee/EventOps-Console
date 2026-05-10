import { ID } from '@/shared/types/primitives.types';
import { Proposal } from '@/entities/proposal/model/types';
import { Role } from '@/entities/user/model/types';
import { ProposalListQuery } from '@/entities/proposal/model/query';
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
  queryParams: ProposalListQuery,
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
  if (role === 'reviewer')
    return isProposalAssignedToReviewer(proposal.id, userId);
  if (role === 'speaker') return isProposalOwnedByUser(proposal, userId);
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
  if (role === 'manager') return true;
  if (role === 'speaker') return isProposalOwnedByUser(proposal, userId);
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
  if (role === 'manager') return true;
  if (role === 'reviewer')
    return isProposalAssignedToReviewer(proposalId, userId);
  return false;
};
