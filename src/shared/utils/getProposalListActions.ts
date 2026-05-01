import { ProposalStatus } from '@/entities/proposal/model/types';
import { ProposalListActions, Role } from '../types/primitives.types';
import {
  proposalListActionsByRole,
  proposalListActionsByStatus,
} from '../data';

const getProposalListActions = (
  role: Role,
  status: ProposalStatus,
): ProposalListActions[] => {
  const actionsByRole = proposalListActionsByRole[role];
  const actionsByStatus = new Set(proposalListActionsByStatus[status]);

  return actionsByRole.filter((item) => actionsByStatus.has(item));
};

export default getProposalListActions;
