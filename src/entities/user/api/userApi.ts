import { User } from '@/entities/user/model/types';
import normalizeResponse from '../../../shared/api/normalizeResponse';
import { ApiResult } from '../../../shared/types/api.types';
import { fallbackError } from '../../../shared/config/errors';

const fetchCurrentUser = async (): Promise<ApiResult<User>> => {
  try {
    const response = await fetch('/api/me');

    return normalizeResponse<User>(response);
  } catch {
    return {
      ok: false,
      status: 0,
      error: fallbackError,
    };
  }
};

export default fetchCurrentUser;
