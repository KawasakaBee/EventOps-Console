import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { isErrorEnvelope } from './isErrorEnvelope';
import { fallbackError } from '../config/errors';
import { ErrorEnvelope } from '../types/api.types';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '/api',
});

export type AppBaseQueryError = {
  status: FetchBaseQueryError['status'];
  error: ErrorEnvelope['error'];
};

const normalizeBaseQueryError = (
  error: FetchBaseQueryError,
): AppBaseQueryError => {
  if (isErrorEnvelope(error.data)) {
    return {
      status: error.status,
      error: error.data.error,
    };
  }

  if (error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR') {
    return {
      status: error.status,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Не удалось выполнить запрос',
      },
    };
  }

  if (error.status === 'PARSING_ERROR') {
    return {
      status: error.status,
      error: {
        code: 'INVALID_RESPONSE',
        message: 'Сервер вернул некорректный ответ',
      },
    };
  }

  return {
    status: error.status,
    error: fallbackError,
  };
};

const baseQueryWithErrorNormalization: BaseQueryFn<
  string | FetchArgs,
  unknown,
  AppBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    return {
      error: normalizeBaseQueryError(result.error),
    };
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: baseQueryWithErrorNormalization,

  tagTypes: [
    'User',
    'Proposal',
    'Track',
    'Tag',
    'Reviewer',
    'Speaker',
    'Review',
    'Comment',
    'Schedule',
    'Audit',
    'Settings',
    'Dashboard',
    'Events',
  ],

  endpoints: () => ({}),
});
