import { PatchProposalStatusResponse } from '@/entities/proposal/api/contracts';
import { PatchProposalStatusRequest } from '@/entities/proposal/api/schema';
import { baseApi } from '@/shared/api/baseApi';
import { ID } from '@/shared/types/primitives.types';

export const proposalStatusTransitionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changeStatus: build.mutation<
      PatchProposalStatusResponse,
      { id: ID; payload: PatchProposalStatusRequest }
    >({
      query: ({ id, payload }) => ({
        url: `/proposals/${id}/status`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Proposal', id: arg.id },
        { type: 'Proposal', id: 'LIST' },
      ],
    }),
  }),
});

export const { useChangeStatusMutation } = proposalStatusTransitionApi;
