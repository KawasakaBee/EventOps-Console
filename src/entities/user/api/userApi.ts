import { User } from '@/entities/user/model/types';
import { ApiResult } from '../../../shared/types/api.types';
import { GetCurrentUserResponse, GetUsersListResponse } from './contracts';
import { normalizeFetch } from '@/shared/api/normalizeResponse';
import { UsersResource } from './types';

const fetchCurrentUser = async (): Promise<ApiResult<User>> => {
  const response = await normalizeFetch<GetCurrentUserResponse>('/api/me');

  if (!response.ok) return response;

  return {
    ok: true,
    data: response.data.user,
  };
};

export default fetchCurrentUser;

export const fetchUsers = async (): Promise<UsersResource> => {
  const users: UsersResource = {
    status: 'loading',
    data: [],
  };

  const response = await normalizeFetch<GetUsersListResponse>('/api/users');

  if (!response.ok) {
    users.status = 'error';
    return users;
  }

  users.data = response.data.users;
  users.status = 'success';
  return users;
};
