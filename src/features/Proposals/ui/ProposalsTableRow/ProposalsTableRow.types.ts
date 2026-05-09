import {
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { ID, Resource, Role } from '@/shared/types/primitives.types';
import { SxProps, Theme } from '@mui/material';

export interface IProposalTableRowProps {
  proposal: ProposalListItem;
  sx: SxProps<Theme>;
  isSelected: boolean;
  role: Role;
  tracks: Resource<Track[]>;
  setProposal: React.Dispatch<
    React.SetStateAction<{
      status: ProposalStatus;
      id: ID;
    } | null>
  >;
}

export interface ITableRowProps {
  rowName: keyof ProposalListItem | 'actions' | 'checkbox';
  data: ProposalListItem;
}
