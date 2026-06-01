import { baseApi } from '@/shared/api/baseApi';
import { GetSpeakerFindResponse, GetSpeakerItemResponse } from './contracts';

export const speakerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserAsSpeaker: build.query<GetSpeakerItemResponse, void>({
      query: () => '/speaker',
      providesTags: ['Speaker'],
    }),
    findSpeakerByEmail: build.query<GetSpeakerFindResponse, string>({
      query: (queryParams) => `/speakers/find?${queryParams}`,
      providesTags: ['Speaker'],
    }),
  }),
});

export const { useGetUserAsSpeakerQuery, useLazyFindSpeakerByEmailQuery } =
  speakerApi;
