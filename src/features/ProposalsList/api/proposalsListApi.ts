import getCurrentUser from '@/entities/user/api/userApi';
import getProposalsErrorState from '../model/getProposalsErrorState';
import { GetProposalsListResponse } from '@/entities/proposal/api/contracts';
import { PaginationResource, UserResource } from '../model/types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

export const fetchUser = async (
  retry: () => void,
  reset: () => void,
): Promise<UserResource> => {
  const getErrorActions = () => ({
    retry,
    resetFilters: reset,
  });

  const user: UserResource = {
    status: 'loading',
    data: null,
    errorProps: null,
  };

  const response = await getCurrentUser();

  if (!response.ok) {
    user.errorProps = getProposalsErrorState(response.error, getErrorActions());
    user.status = 'error';
    return user;
  }

  user.data = response.data;
  user.status = 'success';
  return user;
};

export const fetchPagination = async (
  searchParams: string,
  retry: () => void,
  reset: () => void,
): Promise<PaginationResource> => {
  const getErrorActions = () => ({
    retry,
    resetFilters: reset,
  });

  const pagination: PaginationResource = {
    status: 'loading',
    data: null,
    errorProps: null,
  };

  const response = await normalizeFetch<GetProposalsListResponse>(
    searchParams ? `/api/proposals?${searchParams}` : '/api/proposals',
  );

  if (!response.ok) {
    pagination.errorProps = getProposalsErrorState(
      response.error,
      getErrorActions(),
    );
    pagination.status = 'error';
    return pagination;
  }

  pagination.data = response.data;
  pagination.status = 'success';
  return pagination;
};
