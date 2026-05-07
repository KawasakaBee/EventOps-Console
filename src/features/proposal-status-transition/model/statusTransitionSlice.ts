import { ProposalStatus } from '@/entities/proposal/model/types';
import { ID } from '@/shared/types/primitives.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatusState = {
  availableStatuses: {
    id: ID | null;
    statuses: ProposalStatus[];
  };
  pendingStatus: ProposalStatus | null;
};

const initialState: StatusState = {
  availableStatuses: {
    id: null,
    statuses: [],
  },
  pendingStatus: null,
};

const statusSlice = createSlice({
  name: 'statusSlice',
  initialState,
  reducers: {
    hydrateAvailableStatuses: (
      state,
      action: PayloadAction<StatusState['availableStatuses']>,
    ) => {
      state.availableStatuses = action.payload;
    },

    resetAvailableStatuses: (state) => {
      state.availableStatuses = initialState.availableStatuses;
    },

    addPendingStatus: (
      state,
      action: PayloadAction<StatusState['pendingStatus']>,
    ) => {
      state.pendingStatus = action.payload;
    },

    removePendingStatus: (state) => {
      state.pendingStatus = initialState.pendingStatus;
    },
  },
});

export const {
  hydrateAvailableStatuses,
  resetAvailableStatuses,
  addPendingStatus,
  removePendingStatus,
} = statusSlice.actions;

export const statusReducer = statusSlice.reducer;
