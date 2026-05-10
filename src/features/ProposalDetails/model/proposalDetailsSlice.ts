import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import {
  Proposal,
  ProposalAction,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Review } from '@/entities/review/model/types';
import { Speaker } from '@/entities/speaker/model/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DetailsState = {
  proposal: Proposal | null;
  speakers: Speaker[];
  reviews: Review[];
  comments: Comment[];
  history: HistoryEntry[];
  availableActions: ProposalAction[];
  availableStatuses: ProposalStatus[];
};

const initialState: DetailsState = {
  proposal: null,
  speakers: [],
  reviews: [],
  comments: [],
  history: [],
  availableActions: [],
  availableStatuses: [],
};

const detailsSlice = createSlice({
  name: 'detailsSlice',
  initialState,
  reducers: {
    hydrateDetails: (state, action: PayloadAction<DetailsState>) => {
      state.proposal = action.payload.proposal;
      state.speakers = action.payload.speakers;
      state.reviews = action.payload.reviews;
      state.comments = action.payload.comments;
      state.history = action.payload.history;
      state.availableActions = action.payload.availableActions;
      state.availableStatuses = action.payload.availableStatuses;
    },

    resetDetails: (state) => {
      state.proposal = initialState.proposal;
      state.speakers = initialState.speakers;
      state.reviews = initialState.reviews;
      state.comments = initialState.comments;
      state.history = initialState.history;
      state.availableActions = initialState.availableActions;
      state.availableStatuses = initialState.availableStatuses;
    },

    hydrateProposal: (
      state,
      action: PayloadAction<DetailsState['proposal']>,
    ) => {
      state.proposal = action.payload;
    },

    addHistory: (state, action: PayloadAction<HistoryEntry>) => {
      state.history = [...state.history, action.payload];
    },

    updateAvailableActions: (
      state,
      action: PayloadAction<DetailsState['availableActions']>,
    ) => {
      state.availableActions = action.payload;
    },

    hydrateAvailableStatuses: (
      state,
      action: PayloadAction<DetailsState['availableStatuses']>,
    ) => {
      state.availableStatuses = action.payload;
    },
  },
});

export const {
  hydrateDetails,
  resetDetails,
  hydrateProposal,
  addHistory,
  updateAvailableActions,
  hydrateAvailableStatuses,
} = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;
