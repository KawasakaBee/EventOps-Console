import {
  proposalListRowActionsByRole,
  proposalListRowActionsByStatus,
} from '@/entities/proposal/model/actionPolicies';
import {
  ProposalListRowAction,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Role } from '@/entities/user/model/types';

const getProposalsListRowActions = (
  role: Role,
  status: ProposalStatus,
): ProposalListRowAction[] => {
  const actionsByRole = proposalListRowActionsByRole[role];
  const actionsByStatus = new Set(proposalListRowActionsByStatus[status]);

  return actionsByRole.filter((item) => actionsByStatus.has(item));
};

export default getProposalsListRowActions;
