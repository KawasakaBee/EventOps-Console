import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateReview } from './types';
import { ID } from '@/shared/types/primitives.types';

export type CreateReviewState = { createReview: CreateReview };

const initialState: CreateReviewState = {
  createReview: { type: 'idle' },
};

const createReviewSlise = createSlice({
  name: 'createReviewSlice',
  initialState,
  reducers: {
    openCreateReviewDialog: (state, action: PayloadAction<{ id: ID }>) => {
      state.createReview = { type: 'open', ...action.payload };
    },
    closeCreateReviewDialog: (state) => {
      state.createReview = { type: 'idle' };
    },
  },
});

export const { openCreateReviewDialog, closeCreateReviewDialog } =
  createReviewSlise.actions;

export const createReviewReducer = createReviewSlise.reducer;
