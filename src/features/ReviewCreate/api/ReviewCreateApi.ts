import { PostCreateReviewResponse } from '@/entities/proposal/api/contracts';
import { ID } from '@/shared/types/primitives.types';
import { CreateReviewValues } from '../model/schema';
import { baseApi } from '@/shared/api/baseApi';

export const reviewCreateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation<
      PostCreateReviewResponse,
      { id: ID; payload: CreateReviewValues }
    >({
      query: ({ id, payload }) => ({
        url: `/proposals/${id}/reviews`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Proposal', id: arg.id },
      ],
    }),
  }),
});

export const { useCreateReviewMutation } = reviewCreateApi;
