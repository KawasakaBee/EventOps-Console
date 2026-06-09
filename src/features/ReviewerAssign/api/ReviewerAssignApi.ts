import { ID } from '@/shared/types/primitives.types';
import { PostAssignReviewerResponse } from '@/entities/proposal/api/contracts';
import { baseApi } from '@/shared/api/baseApi';

export const reviewerAssignApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    assignReviewer: build.mutation<
      PostAssignReviewerResponse,
      { id: ID; reviewerId: ID }
    >({
      query: ({ id, reviewerId }) => ({
        url: `/proposals/${id}/assign-reviewer`,
        method: 'POST',
        body: { reviewerId },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Proposal', id: arg.id },
        { type: 'Proposal', id: 'LIST' },
        { type: 'Dashboard', id: 'LIST' },
      ],
    }),
  }),
});

export const { useAssignReviewerMutation } = reviewerAssignApi;
