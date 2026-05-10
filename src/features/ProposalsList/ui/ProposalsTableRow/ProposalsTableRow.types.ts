import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { Role } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/primitives.types';
import { SxProps, Theme } from '@mui/material';

export interface IProposalTableRowProps {
  proposal: ProposalListItem;
  sx: SxProps<Theme>;
  isSelected: boolean;
  role: Role;
  tracks: Resource<Track[]>;
}

export interface ITableRowProps {
  rowName: keyof ProposalListItem | 'actions' | 'checkbox';
  data: ProposalListItem;
}
