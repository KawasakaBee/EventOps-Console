import {
  ProposalListRowAction,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { ID } from '@/shared/types/primitives.types';

export interface IProposalsRowActionProps {
  actions: ProposalListRowAction[];
  proposalId: ID;
  proposalStatus: ProposalStatus;
  availableStatuses: ProposalStatus[];
}
