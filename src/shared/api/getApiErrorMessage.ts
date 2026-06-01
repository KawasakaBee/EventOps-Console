import { SerializedError } from '@reduxjs/toolkit';
import { AppBaseQueryError } from './baseApi';

export const isAppBaseQueryError = (
  error: unknown,
): error is AppBaseQueryError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof (error as AppBaseQueryError).error.message === 'string'
  );
};

export const getApiErrorMessage = (
  error: AppBaseQueryError | SerializedError | undefined,
  fallback = 'Не удалось загрузить данные',
) => {
  if (isAppBaseQueryError(error)) {
    return error.error.message;
  }

  if (error?.message) {
    return error.message;
  }

  return fallback;
};
