import { GetEventsListResponse } from '@/entities/event/api/contracts';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { GetTracksResponse } from '@/entities/track/api/contracts';
import { Role } from '@/entities/user/model/types';
import { AppBaseQueryError } from '@/shared/api/baseApi';
import { SerializedError } from '@reduxjs/toolkit';

export interface IMyProposalsTableRowProps {
  proposal: ProposalListItem;
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
    Exclude<keyof ProposalListItem, 'availableStatuses'> | 'actions',
    { width: number; skeletonWidth: number }
  >;
}

export interface IMyTableRowProps {
  rowName: keyof ProposalListItem | 'actions';
  data: ProposalListItem;
}
