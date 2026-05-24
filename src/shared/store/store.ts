import { detailsReducer } from '@/features/ProposalDetails/model/proposalDetailsSlice';
import { proposalsFiltersReducer } from '@/features/ProposalsList/model/proposalsListSlice';
import { statusTransitionReducer } from '@/features/ProposalStatusTransition/model/proposalStatusTransitionSlice';
import { assignReviewerReducer } from '@/features/ReviewerAssign/model/reviewerAssignSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    proposalsFilters: proposalsFiltersReducer,
    proposalDetails: detailsReducer,
    statusTransition: statusTransitionReducer,
    assignReviewer: assignReviewerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
