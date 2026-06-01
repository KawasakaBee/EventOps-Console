import { GetProposalsListResponse } from '@/entities/proposal/api/contracts';
import { baseApi } from '@/shared/api/baseApi';

export const myProposalsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProposals: build.query<GetProposalsListResponse, string>({
      query: (queryParams) =>
        queryParams ? `/proposals?${queryParams}` : '/proposals?owner=me',
      providesTags: (result) =>
        result
          ? [
              { type: 'Proposal' as const, id: 'LIST' },
              ...result.items.map(({ id }) => ({
                type: 'Proposal' as const,
                id,
              })),
            ]
          : [{ type: 'Proposal' as const, id: 'LIST' }],
    }),
  }),
});

export const { useGetMyProposalsQuery } = myProposalsApi;
