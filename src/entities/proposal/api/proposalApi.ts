import { ID } from '@/shared/types/primitives.types';
import { GetProposalResponse } from '@/entities/proposal/api/contracts';
import { baseApi } from '@/shared/api/baseApi';

export const proposalDetailsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProposal: build.query<GetProposalResponse, ID>({
      query: (id) => `/proposals/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Proposal', id }],
    }),
  }),
});

export const { useGetProposalQuery } = proposalDetailsApi;
