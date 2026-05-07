import { ProposalStatus } from '@/entities/proposal/model/types';
import { ID, ProposalListRowAction } from '@/shared/types/primitives.types';

export interface IProposalsRowActionProps {
  actions: ProposalListRowAction[];
  proposalId: ID;
  proposalStatus: ProposalStatus;
  setProposal: React.Dispatch<
    React.SetStateAction<{
      status: ProposalStatus;
      id: ID;
    } | null>
  >;
  availableStatuses: ProposalStatus[];
}
