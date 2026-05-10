import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OpenMultipleTransitionPayload,
  OpenSingleTransitionPayload,
  StatusTransition,
} from './types';

export type StatusTransitionState = { transition: StatusTransition };

const initialState: StatusTransitionState = {
  transition: { type: 'idle' },
};

const statusTransitionSlice = createSlice({
  name: 'statusTransitionSlice',
  initialState,
  reducers: {
    openSingleStatusTransition: (
      state,
      action: PayloadAction<OpenSingleTransitionPayload>,
    ) => {
      state.transition = {
        type: 'single',
        ...action.payload,
      };
    },

    openMultipleStatusTransition: (
      state,
      action: PayloadAction<OpenMultipleTransitionPayload>,
    ) => {
      state.transition = {
        type: 'multiple',
        ...action.payload,
      };
    },

    closeStatusTransition: (state) => {
      state.transition = { type: 'idle' };
    },
  },
});

export const {
  openSingleStatusTransition,
  openMultipleStatusTransition,
  closeStatusTransition,
} = statusTransitionSlice.actions;

export const statusTransitionReducer = statusTransitionSlice.reducer;
