import {
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Role } from '@/entities/user/model/types';
import { ID } from '@/shared/types/primitives.types';

export interface IProposalsBulkActionsProps {
  userRole: Role;
  proposals: ProposalListItem[];
  selectedIds: ID[];
  isDisabled: boolean;
  availableStatuses: ProposalStatus[];
  currentStatuses: Set<ProposalStatus>;
}
