import { AuditAction, AuditEntity } from '@/entities/audit/model/types';
import { ID } from '@/shared/types/primitives.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuditFiltersState = {
  draftFilters: {
    search: string | null;
    action: AuditAction[];
    actorId: ID | null;
    entity: AuditEntity[];
  };
};

const initialState: AuditFiltersState = {
  draftFilters: {
    search: null,
    action: [],
    actorId: null,
    entity: [],
  },
};

const auditFiltersSlice = createSlice({
  name: 'auditFilters',
  initialState,
  reducers: {
    hydrateAuditFilters: (
      state,
      action: PayloadAction<AuditFiltersState['draftFilters']>,
    ) => {
      state.draftFilters = action.payload;
    },

    patchAuditFilters: (
      state,
      action: PayloadAction<Partial<AuditFiltersState['draftFilters']>>,
    ) => {
      state.draftFilters = { ...state.draftFilters, ...action.payload };
    },

    resetAuditFilters: (state) => {
      state.draftFilters = initialState.draftFilters;
    },
  },
});

export const { hydrateAuditFilters, patchAuditFilters, resetAuditFilters } =
  auditFiltersSlice.actions;

export const auditFiltersReducer = auditFiltersSlice.reducer;
