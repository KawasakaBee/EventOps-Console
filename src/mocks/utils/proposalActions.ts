import { Role } from '@/entities/user/model/types';
import {
  isProposalAssignedToReviewer,
  isProposalOwnedByUser,
} from './proposalRelations';
import {
  ProposalAction,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { ID } from '@/shared/types/primitives.types';

export const getAvailableProposalActions = (
  role: Role,
  params: {
    status: ProposalStatus;
    proposalId: ID;
    ownerId: ID;
  },
  userId: ID,
  reviewerCount: number,
): ProposalAction[] => {
  const { status, proposalId, ownerId } = params;
  const availableActions: ProposalAction[] = [];

  if (role === 'admin' || role === 'manager') {
    if (status === 'submitted') {
      availableActions.push('assignReviewer', 'addComment', 'changeStatus');
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
    if (!isProposalAssignedToReviewer(proposalId, userId)) return [];

    if (status === 'submitted' || status === 'in_review')
      availableActions.push('addComment', 'addReview');
  }

  if (role === 'speaker') {
    if (!isProposalOwnedByUser(ownerId, userId)) return [];

    if (status === 'draft') availableActions.push('edit', 'submit');
  }

  return availableActions;
};
