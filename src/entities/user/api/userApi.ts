import { baseApi } from '@/shared/api/baseApi';
import {
  GetUsersListResponse,
  PostDemoLoginRequest,
  PostDemoLoginResponse,
} from './contracts';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersListResponse, void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    loginDemo: build.mutation<PostDemoLoginResponse, PostDemoLoginRequest>({
      query: ({ role }) => ({
        url: '/demo-login',
        method: 'POST',
        body: { role },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery, useLoginDemoMutation } = userApi;
