import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { Role } from '@/shared/types/primitives.types';

export interface IProposalsTableProps {
  proposals: ProposalListItem[];
  tracks: Track[];
  role: Role;
}

export interface ITableRowProps {
  rowName: keyof ProposalListItem | 'actions' | 'checkbox';
  data: ProposalListItem;
  tracksList: Track[];
}
