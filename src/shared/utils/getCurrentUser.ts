import { User } from '@/entities/user/model/types';
import normalizeResponse from '../api/normalizeResponse';
import { ApiResult } from '../types/api.types';
import { fallbackError } from '../config/errors';

const getCurrentUser = async (): Promise<ApiResult<User>> => {
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

export default getCurrentUser;
