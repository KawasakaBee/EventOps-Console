import { GetProposalsByTrackIdResponse } from '@/entities/proposal/api/contracts';
import {
  GetScheduleResponse,
  PatchScheduleAssignResponse,
} from '@/entities/schedule/api/contracts';
import { PatchScheduleAssignRequest } from '@/entities/schedule/api/schema';
import { baseApi } from '@/shared/api/baseApi';
import { ID } from '@/shared/types/primitives.types';

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSchedule: build.query<GetScheduleResponse, string>({
      query: (searchParams) => `/schedule?${searchParams}`,
      providesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),
    getProposalsByTrackId: build.query<GetProposalsByTrackIdResponse, ID>({
      query: (id) => `/schedule/proposals/${id}`,
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
      ],
    }),
  }),
});

export const {
  useGetScheduleQuery,
  useLazyGetProposalsByTrackIdQuery,
  useAssignProposalMutation,
} = scheduleApi;
