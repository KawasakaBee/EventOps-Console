import { GetAuditListResponse } from '@/entities/audit/api/contracts';
import { baseApi } from '@/shared/api/baseApi';

export const auditApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAuditPagination: build.query<GetAuditListResponse, string>({
      query: (queryParams) => `/audit?${queryParams}`,
      providesTags: [{ type: 'Audit', id: 'LIST' }],
    }),
  }),
});

export const { useGetAuditPaginationQuery } = auditApi;
