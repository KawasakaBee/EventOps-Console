import { proposalsFiltersReducer } from '@/features/ProposalsFilters/model/proposalsFiltersSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    proposalsFilters: proposalsFiltersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
