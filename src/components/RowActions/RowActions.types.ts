import { ID, ProposalListRowActions } from '@/shared/types/primitives.types';

export interface IRowActionProps {
  actions: ProposalListRowActions[];
  proposalId: ID;
}
