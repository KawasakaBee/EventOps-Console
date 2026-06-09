import { GetProposalsByTrackIdResponse } from '@/entities/proposal/api/contracts';
import {
  GetScheduleResponse,
  PatchScheduleAssignResponse,
  PatchScheduleUnassignResponse,
} from '@/entities/schedule/api/contracts';
import {
  PatchScheduleAssignRequest,
  PatchScheduleUnassignRequest,
} from '@/entities/schedule/api/schema';
import { baseApi } from '@/shared/api/baseApi';
import { ID } from '@/shared/types/primitives.types';

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSchedule: build.query<
      GetScheduleResponse,
      { id: ID; searchParams: string }
    >({
      query: ({ id, searchParams }) => `/schedule/${id}?${searchParams}`,
      providesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),
    getProposalsByTrackId: build.query<
      GetProposalsByTrackIdResponse,
      { eventId: ID; trackId: ID }
    >({
      query: ({ eventId, trackId }) =>
        `/schedule/${eventId}/proposals/${trackId}`,
      providesTags: [{ type: 'Proposal', id: 'LIST' }],
    }),
    assignProposal: build.mutation<
      PatchScheduleAssignResponse,
      PatchScheduleAssignRequest
    >({
      query: (payload) => ({
        url: 'schedule/assign',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        { type: 'Schedule', id: 'LIST' },
        { type: 'Proposal', id: 'LIST' },
        { type: 'Audit', id: 'LIST' },
      ],
    }),
    unassignProposal: build.mutation<
      PatchScheduleUnassignResponse,
      PatchScheduleUnassignRequest
    >({
      query: (payload) => ({
        url: '/schedule/unassign',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        { type: 'Schedule', id: 'LIST' },
        { type: 'Proposal', id: 'LIST' },
        { type: 'Audit', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useLazyGetScheduleQuery,
  useLazyGetProposalsByTrackIdQuery,
  useAssignProposalMutation,
  useUnassignProposalMutation,
} = scheduleApi;
