import { ID, ProposalListRowActions } from '@/shared/types/primitives.types';

export interface IProposalsRowActionProps {
  actions: ProposalListRowActions[];
  proposalId: ID;
}
