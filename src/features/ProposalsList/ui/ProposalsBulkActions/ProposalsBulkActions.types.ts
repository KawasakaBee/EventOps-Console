import {
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { User } from '@/entities/user/model/types';
import { ID } from '@/shared/types/primitives.types';

export interface IProposalsBulkActionsProps {
  user: User;
  proposals: ProposalListItem[];
  selectedIds: ID[];
  isDisabled: boolean;
  availableStatuses: ProposalStatus[];
  currentStatuses: Set<ProposalStatus>;
}
