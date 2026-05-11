import {
  proposalListActionsByRole,
  proposalListActionsByStatus,
} from '@/entities/proposal/model/actionPolicies';
import {
  ProposalListAction,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Role } from '@/entities/user/model/types';

const getProposalsListActions = (
  role: Role,
  status: ProposalStatus,
): ProposalListAction[] => {
  const actionsByRole = proposalListActionsByRole[role];
  const actionsByStatus = new Set(proposalListActionsByStatus[status]);

  return actionsByRole.filter((item) => actionsByStatus.has(item));
};

export default getProposalsListActions;
