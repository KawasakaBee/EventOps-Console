import {
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { User } from '@/entities/user/model/types';

export interface IProposalsBulkActionsProps {
  user: User;
  proposals: ProposalListItem[];
  isDisabled: boolean;
  availableStatuses: ProposalStatus[];
}
