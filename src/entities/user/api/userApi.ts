import { User } from '@/entities/user/model/types';
import { ApiResult } from '../../../shared/types/api.types';
import { GetCurrentUserResponse } from './contracts';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

const fetchCurrentUser = async (): Promise<ApiResult<User>> => {
  const response = await normalizeFetch<GetCurrentUserResponse>('/api/me');

  if (!response.ok) return response;

  return {
    ok: true,
    data: response.data.user,
  };
};

export default fetchCurrentUser;
