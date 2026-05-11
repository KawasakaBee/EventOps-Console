import { Role } from '@/entities/user/model/types';
import {
  ProposalListAction,
  ProposalListRowAction,
  ProposalStatus,
} from './types';

export const proposalListActionsByRole: Record<Role, ProposalListAction[]> = {
  admin: ['assignReviewer', 'changeStatus'],
  manager: ['assignReviewer', 'changeStatus'],
  reviewer: [],
  speaker: [],
};

export const proposalListActionsByStatus: Record<
  ProposalStatus,
  ProposalListAction[]
> = {
  draft: [],
  submitted: ['assignReviewer', 'changeStatus'],
  rejected: ['changeStatus'],
  accepted: ['changeStatus'],
  changes_requested: ['changeStatus'],
  in_review: ['assignReviewer', 'changeStatus'],
  scheduled: ['changeStatus'],
};

export const proposalListRowActionsByRole: Record<
  Role,
  ProposalListRowAction[]
> = {
  admin: ['viewDetails', 'assignReviewer', 'changeStatus'],
  manager: ['viewDetails', 'assignReviewer', 'changeStatus'],
  reviewer: ['viewDetails', 'addReview'],
  speaker: ['viewDetails', 'edit'],
};

export const proposalListRowActionsByStatus: Record<
  ProposalStatus,
  ProposalListRowAction[]
> = {
  draft: ['viewDetails', 'edit'],
  submitted: ['viewDetails', 'assignReviewer', 'changeStatus'],
  rejected: ['viewDetails', 'changeStatus'],
  accepted: ['viewDetails', 'changeStatus'],
  changes_requested: ['viewDetails', 'changeStatus'],
  in_review: ['viewDetails', 'assignReviewer', 'changeStatus', 'addReview'],
  scheduled: ['viewDetails', 'changeStatus'],
};
