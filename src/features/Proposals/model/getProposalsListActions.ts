import { ProposalStatus } from '@/entities/proposal/model/types';
import {
  ProposalListAction,
  Role,
} from '../../../shared/types/primitives.types';
import {
  proposalListActionsByRole,
  proposalListActionsByStatus,
} from '../../../shared/data';

const getProposalsListActions = (
  role: Role,
  status: ProposalStatus,
): ProposalListAction[] => {
  const actionsByRole = proposalListActionsByRole[role];
  const actionsByStatus = new Set(proposalListActionsByStatus[status]);

  return actionsByRole.filter((item) => actionsByStatus.has(item));
};

export default getProposalsListActions;
