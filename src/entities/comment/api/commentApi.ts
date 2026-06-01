import { baseApi } from '@/shared/api/baseApi';
import { GetCommentsResponse } from './contracts';

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<GetCommentsResponse, void>({
      query: () => '/comments',
      providesTags: ['Comment'],
    }),
  }),
});

export const { useGetCommentsQuery } = commentApi;
