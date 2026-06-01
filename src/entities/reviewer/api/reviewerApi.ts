import { baseApi } from '@/shared/api/baseApi';
import { GetReviewersResponse } from './contracts';

export const reviewerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviewers: build.query<GetReviewersResponse, void>({
      query: () => '/reviewers',
      providesTags: ['Reviewer'],
    }),
  }),
});

export const { useGetReviewersQuery } = reviewerApi;
