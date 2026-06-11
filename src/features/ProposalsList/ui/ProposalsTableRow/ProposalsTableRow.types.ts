import { GetEventsListResponse } from '@/entities/event/api/contracts';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { GetTracksResponse } from '@/entities/track/api/contracts';
import { Role } from '@/entities/user/model/types';
import { AppBaseQueryError } from '@/shared/api/baseApi';
import { SxProps, Theme } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';

export interface IProposalTableRowProps {
  proposal: ProposalListItem;
  sx: SxProps<Theme>;
  isSelected: boolean;
  role: Role;
  tracks: GetTracksResponse | undefined;
  isTracksLoading: boolean;
  isTracksError: boolean;
  tracksError: AppBaseQueryError | SerializedError | undefined;
  events: GetEventsListResponse | undefined;
  isEventsLoading: boolean;
  isEventsError: boolean;
  eventsError: AppBaseQueryError | SerializedError | undefined;
  columnsWidth: Record<
    | Exclude<keyof ProposalListItem, 'availableStatuses'>
    | ('actions' | 'checkbox'),
    {
      width: number;
      skeletonWidth: number;
    }
  >;
}

export interface ITableRowProps {
  rowName: keyof ProposalListItem | 'actions' | 'checkbox';
  data: ProposalListItem;
}
