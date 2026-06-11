import { PostEventCreateResponse } from '@/entities/event/api/contracts';
import { SettingsValues } from '@/entities/event/api/schema';
import { baseApi } from '@/shared/api/baseApi';

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEvent: build.mutation<PostEventCreateResponse, SettingsValues>({
      query: (payload) => ({
        url: '/settings',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        {
          type: 'Dashboard',
          id: 'LIST',
        },
        { type: 'Events', id: 'LIST' },
      ],
    }),
  }),
});

export const { useCreateEventMutation } = settingsApi;
