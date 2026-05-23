import { GetProposalsListResponse } from '@/entities/proposal/api/contracts';
import { PaginationResource } from '@/features/ProposalsList/model/types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';
import getMyProposalsErrorState from '../model/getMyProposalsErrorState';

export const fetchMyProposals = async (
  searchParams: string,
  retry: () => void,
): Promise<PaginationResource> => {
  const getErrorActions = () => ({
    retry,
  });

  const pagination: PaginationResource = {
    status: 'loading',
    data: null,
    errorProps: null,
  };

  const response = await normalizeFetch<GetProposalsListResponse>(
    searchParams ? `/api/proposals?${searchParams}` : '/api/proposals?owner=me',
  );

  if (!response.ok) {
    pagination.errorProps = getMyProposalsErrorState(
      response.error,
      getErrorActions(),
    );
    pagination.status = 'error';
    return pagination;
  }

  pagination.status = 'success';
  pagination.data = response.data;
  return pagination;
};
