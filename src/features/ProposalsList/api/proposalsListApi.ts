import getCurrentUser from '@/shared/utils/getCurrentUser';
import getProposalsErrorState from '../model/getProposalsErrorState';
import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';
import normalizeResponse from '@/shared/api/normalizeResponse';
import { GetProposalsListResponse } from '@/entities/proposal/api/contracts';
import {
  PaginationResource,
  UserResource,
} from '@/shared/types/resource.types';

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

  const response = await fetchWithDemoAuth(
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

  const result = await normalizeResponse<GetProposalsListResponse>(
    response.data,
  );

  if (!result.ok) {
    pagination.errorProps = getProposalsErrorState(
      result.error,
      getErrorActions(),
    );
    pagination.status = 'error';
    return pagination;
  }

  pagination.data = result.data;
  pagination.status = 'success';
  return pagination;
};
