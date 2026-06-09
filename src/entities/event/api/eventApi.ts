import { baseApi } from '@/shared/api/baseApi';
import { GetEventsListResponse } from './contracts';

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<GetEventsListResponse, void>({
      query: () => '/events',
      providesTags: [{ type: 'Events', id: 'LIST' }],
    }),
  }),
});

export const { useGetEventsQuery } = eventApi;
