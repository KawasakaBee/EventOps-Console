import { statusReducer } from '@/features/proposal-status-transition/model/statusTransitionSlice';
import { detailsReducer } from '@/features/Proposal/model/proposalDetailsSlice';
import { proposalsFiltersReducer } from '@/features/Proposals/model/proposalsFiltersSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    proposalsFilters: proposalsFiltersReducer,
    proposalDetails: detailsReducer,
    proposalStatus: statusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
