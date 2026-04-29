import {
  ProposalFormat,
  ProposalLevel,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { ID } from '@/shared/types/primitives.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FiltersState = {
  filters: {
    search: string | null;
    status: ProposalStatus[];
    trackId: ID[];
    level: ProposalLevel[];
    format: ProposalFormat[];
    reviewerId: ID | null;
  };
};

const initialState: FiltersState = {
  filters: {
    search: null,
    status: [],
    trackId: [],
    level: [],
    format: [],
    reviewerId: null,
  },
};

const proposalsFiltersSlice = createSlice({
  name: 'proposalsFilters',
  initialState,
  reducers: {
    hydrateFilters: (state, action: PayloadAction<FiltersState>) => {
      state.filters = action.payload.filters;
    },

    patchFilters: (
      state,
      action: PayloadAction<Partial<FiltersState['filters']>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { hydrateFilters, patchFilters, resetFilters } =
  proposalsFiltersSlice.actions;

export const proposalsFiltersReducer = proposalsFiltersSlice.reducer;
