import { GetProposalsListResponse } from '@/entities/proposal/api/contracts';
import { baseApi } from '@/shared/api/baseApi';

export const proposalsListApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProposalsPagination: build.query<GetProposalsListResponse, string>({
      query: (queryParams) => `/proposals?${queryParams}`,
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

export const { useGetProposalsPaginationQuery } = proposalsListApi;
