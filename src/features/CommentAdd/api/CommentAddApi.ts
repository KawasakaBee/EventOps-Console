import { ID } from '@/shared/types/primitives.types';
import { PostCreateCommentResponse } from '@/entities/proposal/api/contracts';
import { baseApi } from '@/shared/api/baseApi';
import { PostAddCommentRequest } from '@/entities/comment/api/schema';

export const commentAddApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addComment: build.mutation<
      PostCreateCommentResponse,
      { id: ID; payload: PostAddCommentRequest }
    >({
      query: ({ id, payload }) => ({
        url: `/proposals/${id}/comments`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Proposal', id: arg.id },
      ],
    }),
  }),
});

export const { useAddCommentMutation } = commentAddApi;
