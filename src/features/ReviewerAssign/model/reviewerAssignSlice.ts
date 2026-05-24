import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AssignReviewer,
  OpenMultipleAssignReviewer,
  OpenSingleAssignReviewer,
} from './types';

export type AssignReviewerState = { assignReviewer: AssignReviewer };

const initialState: AssignReviewerState = {
  assignReviewer: { type: 'idle' },
};

const assignReviewerSlice = createSlice({
  name: 'assignReviewerSlice',
  initialState,
  reducers: {
    openSingleAssignReviewer: (
      state,
      action: PayloadAction<OpenSingleAssignReviewer>,
    ) => {
      state.assignReviewer = {
        type: 'single',
        ...action.payload,
      };
    },

    openMultipleAssignReviewer: (
      state,
      action: PayloadAction<OpenMultipleAssignReviewer>,
    ) => {
      state.assignReviewer = {
        type: 'multiple',
        ...action.payload,
      };
    },

    closeAssignReviewer: (state) => {
      state.assignReviewer = { type: 'idle' };
    },
  },
});

export const {
  openSingleAssignReviewer,
  openMultipleAssignReviewer,
  closeAssignReviewer,
} = assignReviewerSlice.actions;

export const assignReviewerReducer = assignReviewerSlice.reducer;
