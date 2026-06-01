import { baseApi } from '@/shared/api/baseApi';
import { GetTracksResponse } from './contracts';

export const trackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTracks: build.query<GetTracksResponse, void>({
      query: () => '/tracks',
      providesTags: ['Track'],
    }),
  }),
});

export const { useGetTracksQuery } = trackApi;
