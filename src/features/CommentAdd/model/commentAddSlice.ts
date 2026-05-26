import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ID } from '@/shared/types/primitives.types';
import { AddComment } from './types';

export type AddCommentState = { addComment: AddComment };

const initialState: AddCommentState = {
  addComment: { type: 'idle' },
};

const addCommentSliсe = createSlice({
  name: 'addCommentSlise',
  initialState,
  reducers: {
    openAddCommentDialog: (state, action: PayloadAction<{ id: ID }>) => {
      state.addComment = { type: 'open', ...action.payload };
    },
    closeAddCommentDialog: (state) => {
      state.addComment = { type: 'idle' };
    },
  },
});

export const { openAddCommentDialog, closeAddCommentDialog } =
  addCommentSliсe.actions;

export const addCommentReducer = addCommentSliсe.reducer;
