import {
  ProposalListRowAction,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { ID } from '@/shared/types/primitives.types';

export interface IMyProposalsRowActionsProps {
  actions: ProposalListRowAction[];
  proposalId: ID;
  proposalStatus: ProposalStatus;
  availableStatuses: ProposalStatus[];
}
