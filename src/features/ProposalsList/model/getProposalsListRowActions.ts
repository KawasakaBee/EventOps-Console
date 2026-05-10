import {
  ProposalListRowAction,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Role } from '@/entities/user/model/types';
import {
  proposalListRowActionsByRole,
  proposalListRowActionsByStatus,
} from '@/shared/config/permissions';

const getProposalsListRowActions = (
  role: Role,
  status: ProposalStatus,
): ProposalListRowAction[] => {
  const actionsByRole = proposalListRowActionsByRole[role];
  const actionsByStatus = new Set(proposalListRowActionsByStatus[status]);

  return actionsByRole.filter((item) => actionsByStatus.has(item));
};

export default getProposalsListRowActions;
