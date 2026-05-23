import { isErrorEnvelope } from '@/shared/api/isErrorEnvelope';
import { ApiResult } from '../types/api.types';
import { fallbackError } from '../config/errors';

type NormalizeFetchInit = RequestInit & {
  headers?: HeadersInit;
};

export const normalizeFetch = async <T>(
  input: RequestInfo | URL,
  init: NormalizeFetchInit = {},
): Promise<ApiResult<T>> => {
  try {
    const headers = new Headers(init.headers);

    if (init.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(input, {
      ...init,
      headers,
    });

    let data: unknown;

    try {
      data = await response.json();
    } catch {
      return {
        ok: false,
        status: response.status,
        error: {
          code: 'INVALID_RESPONSE',
          message: 'Сервер вернул неожиданный ответ',
        },
      };
    }

    if (!response.ok) {
      if (isErrorEnvelope(data)) {
        return { ok: false, status: response.status, error: data.error };
      }

      return {
        ok: false,
        status: response.status,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Произошла неизвестная ошибка',
        },
      };
    }

    return { ok: true, data: data as T };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortController') {
      return {
        ok: false,
        status: 0,
        error: {
          code: 'REQUEST_ABORTED',
          message: 'Запрос отменён',
        },
      };
    }

    return {
      ok: false,
      status: 0,
      error: fallbackError,
    };
  }
};
