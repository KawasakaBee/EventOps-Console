import { ProposalStatus } from '@/entities/proposal/model/types';
import {
  ProposalListRowActions,
  Role,
} from '../../../shared/types/primitives.types';
import {
  proposalListRowActionsByRole,
  proposalListRowActionsByStatus,
} from '../../../shared/data';

const getProposalsListRowActions = (
  role: Role,
  status: ProposalStatus,
): ProposalListRowActions[] => {
  const actionsByRole = proposalListRowActionsByRole[role];
  const actionsByStatus = new Set(proposalListRowActionsByStatus[status]);

  return actionsByRole.filter((item) => actionsByStatus.has(item));
};

export default getProposalsListRowActions;
