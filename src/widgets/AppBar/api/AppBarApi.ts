import { PostLogoutResponse } from '@/entities/user/api/contracts';
import { baseApi } from '@/shared/api/baseApi';

export const appBarApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<PostLogoutResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLogoutMutation } = appBarApi;
