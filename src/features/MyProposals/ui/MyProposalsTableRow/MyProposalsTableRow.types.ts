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
}

export interface IMyTableRowProps {
  rowName: keyof ProposalListItem | 'actions';
  data: ProposalListItem;
}
