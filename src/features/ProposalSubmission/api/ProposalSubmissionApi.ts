import {
  PatchProposalResponse,
  PostProposalResponse,
} from '@/entities/proposal/api/contracts';
import { ID } from '@/shared/types/primitives.types';
import { baseApi } from '@/shared/api/baseApi';
import {
  PatchProposalRequestSchema,
  PostProposalRequest,
} from '@/entities/proposal/api/schema';

export const createProposalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProposal: build.mutation<PostProposalResponse, PostProposalRequest>({
      query: (payload) => ({
        url: '/proposals',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'Proposal', id: result.proposal.id },
              { type: 'Proposal', id: 'LIST' },
            ]
          : [],
    }),
    changeProposal: build.mutation<
      PatchProposalResponse,
      { id: ID; payload: PatchProposalRequestSchema }
    >({
      query: ({ id, payload }) => ({
        url: `/proposals/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, _error, { payload }) => {
        if (payload.status === 'draft') {
          return [];
        }

        return [
          { type: 'Proposal', id: 'LIST' },
          { type: 'Audit', id: 'LIST' },
        ];
      },
    }),
  }),
});

export const { useCreateProposalMutation, useChangeProposalMutation } =
  createProposalApi;
