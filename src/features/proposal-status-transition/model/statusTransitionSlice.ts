import { ProposalStatus } from '@/entities/proposal/model/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatusState = {
  pendingStatus: ProposalStatus | null;
};

const initialState: StatusState = {
  pendingStatus: null,
};

const statusSlice = createSlice({
  name: 'statusSlice',
  initialState,
  reducers: {
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

export const { addPendingStatus, removePendingStatus } = statusSlice.actions;

export const statusReducer = statusSlice.reducer;
