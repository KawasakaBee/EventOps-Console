import { auditFiltersReducer } from '@/features/Audit/model/auditSlice';
import { addCommentReducer } from '@/features/CommentAdd/model/commentAddSlice';
import { proposalsFiltersReducer } from '@/features/ProposalsList/model/proposalsListSlice';
import { statusTransitionReducer } from '@/features/ProposalStatusTransition/model/proposalStatusTransitionSlice';
import { createReviewReducer } from '@/features/ReviewCreate/model/reviewCreateSlice';
import { assignReviewerReducer } from '@/features/ReviewerAssign/model/reviewerAssignSlice';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,

    proposalsFilters: proposalsFiltersReducer,
    statusTransition: statusTransitionReducer,
    assignReviewer: assignReviewerReducer,
    createReview: createReviewReducer,
    addComment: addCommentReducer,
    auditFilters: auditFiltersReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
