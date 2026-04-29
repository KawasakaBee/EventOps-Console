import type { ApiResult } from '../types/api.types';
import { isErrorEnvelope } from '../utils/typeGuards';

const normalizeResponse = async <T>(
  response: Response,
): Promise<ApiResult<T>> => {
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
};

export default normalizeResponse;
