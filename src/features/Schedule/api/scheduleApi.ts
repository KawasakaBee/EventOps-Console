import { GetScheduleResponse } from '@/entities/schedule/api/contracts';
import { baseApi } from '@/shared/api/baseApi';

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSchedule: build.query<GetScheduleResponse, string>({
      query: (searchParams) => `/schedule?${searchParams}`,
      providesTags: (_result, _error, date) =>
        date === ''
          ? [{ type: 'Schedule', id: 'LIST' }]
          : [{ type: 'Schedule', id: date }],
    }),
  }),
});

export const { useGetScheduleQuery } = scheduleApi;
