import { normalizeFetch } from '@/shared/api/normalizeResponse';
import getAuditErrorState from '../model/getAuditErrorState';
import { AuditPaginationResource } from '../model/types';
import { GetAuditListResponse } from '@/entities/audit/api/contracts';

export const fetchAuditPagination = async (
  searchParams: string,
  retry: () => void,
  reset: () => void,
): Promise<AuditPaginationResource> => {
  const getErrorActions = () => ({
    retry,
    resetFilters: reset,
  });

  const pagination: AuditPaginationResource = {
    status: 'loading',
    data: null,
    errorProps: null,
  };

  const response = await normalizeFetch<GetAuditListResponse>(
    searchParams ? `/api/audit?${searchParams}` : '/api/audit',
  );

  if (!response.ok) {
    pagination.errorProps = getAuditErrorState(
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
