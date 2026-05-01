import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { Role } from '@/shared/types/primitives.types';
import { SxProps, Theme } from '@mui/material';

export interface IProposalTableRowProps {
  proposal: ProposalListItem;
  sx: SxProps<Theme>;
  isSelected: boolean;
  role: Role;
  tracks: Track[];
}
