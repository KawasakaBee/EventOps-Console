import { GetEventsListResponse } from '@/entities/event/api/contracts';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { GetTracksResponse } from '@/entities/track/api/contracts';
import { AppBaseQueryError } from '@/shared/api/baseApi';
import { SerializedError } from '@reduxjs/toolkit';

export interface IDashboardTableRowProps {
  proposal: ProposalListItem;
  tracks: GetTracksResponse | undefined;
  isTracksLoading: boolean;
  isTracksError: boolean;
  tracksError: AppBaseQueryError | SerializedError | undefined;
  events: GetEventsListResponse | undefined;
  isEventsLoading: boolean;
  isEventsError: boolean;
  eventsError: AppBaseQueryError | SerializedError | undefined;
}

export interface ITableRowProps {
  rowName: keyof ProposalListItem;
  data: ProposalListItem;
}
