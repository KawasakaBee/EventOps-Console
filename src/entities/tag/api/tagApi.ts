import { baseApi } from '@/shared/api/baseApi';
import { GetTagsResponse } from './contracts';

export const tagApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<GetTagsResponse, void>({
      query: () => '/tags',
      providesTags: ['Tag'],
    }),
  }),
});

export const { useGetTagsQuery } = tagApi;
