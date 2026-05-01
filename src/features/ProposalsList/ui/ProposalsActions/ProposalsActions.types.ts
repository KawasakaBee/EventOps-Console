import { ProposalListItem } from '@/entities/proposal/model/types';
import { User } from '@/entities/user/model/types';

export interface IProposalsActionsProps {
  user: User;
  proposals: ProposalListItem[];
  isDisabled: boolean;
}
