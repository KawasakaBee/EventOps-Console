import {
  ProposalFormat,
  ProposalLevel,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { ID } from '@/shared/types/primitives.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FiltersState = {
  draftFilters: {
    search: string | null;
    status: ProposalStatus[];
    trackId: ID[];
    level: ProposalLevel[];
    format: ProposalFormat[];
    reviewerId: ID | null;
  };
  selectedIds: ID[];
};

const initialState: FiltersState = {
  draftFilters: {
    search: null,
    status: [],
    trackId: [],
    level: [],
    format: [],
    reviewerId: null,
  },
  selectedIds: [],
};

const proposalsFiltersSlice = createSlice({
  name: 'proposalsFilters',
  initialState,
  reducers: {
    hydrateFilters: (
      state,
      action: PayloadAction<FiltersState['draftFilters']>,
    ) => {
      state.draftFilters = action.payload;
    },

    patchFilters: (
      state,
      action: PayloadAction<Partial<FiltersState['draftFilters']>>,
    ) => {
      state.draftFilters = { ...state.draftFilters, ...action.payload };
    },

    resetFilters: (state) => {
      state.draftFilters = initialState.draftFilters;
    },

    setSelectedIds: (state, action: PayloadAction<ID[]>) => {
      state.selectedIds = action.payload;
    },

    toggleSelectedId: (state, action: PayloadAction<ID>) => {
      const prev: Set<ID> = new Set(state.selectedIds);

      if (prev.has(action.payload)) {
        prev.delete(action.payload);
      } else {
        prev.add(action.payload);
      }

      state.selectedIds = [...prev];
    },

    resetSelectedIds: (state) => {
      state.selectedIds = initialState.selectedIds;
    },
  },
});

export const {
  hydrateFilters,
  patchFilters,
  resetFilters,
  setSelectedIds,
  toggleSelectedId,
  resetSelectedIds,
} = proposalsFiltersSlice.actions;

export const proposalsFiltersReducer = proposalsFiltersSlice.reducer;
