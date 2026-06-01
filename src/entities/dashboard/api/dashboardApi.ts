import { baseApi } from '@/shared/api/baseApi';
import { GetDashboardResponse } from './contracts';
import { ID } from '@/shared/types/primitives.types';
import { DashboardRange } from '../model/types';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query<
      GetDashboardResponse,
      { id: ID; range: DashboardRange }
    >({
      query: ({ id, range }) => `/events/${id}/dashboard?range=${range}`,
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
