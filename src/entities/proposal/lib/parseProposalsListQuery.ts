import { QueryParams } from '@/shared/types/api.types';
import parsePositiveInt from '@/shared/utils/parsePositiveInt';
import {
  isPageSize,
  isProposalFormat,
  isProposalLevel,
  isProposalStatus,
  isSortBy,
  isSortOrder,
} from '@/shared/utils/typeGuards';

export const parseProposalsListQuery = (requestUrl: string): QueryParams => {
  const url = new URL(requestUrl, 'http://localhost');
  const pageSize = parsePositiveInt(url.searchParams.get('pageSize'), 20);

  const sortBy = url.searchParams.get('sortBy');
  const sortOrder = url.searchParams.get('sortOrder');

  return {
    page: parsePositiveInt(url.searchParams.get('page'), 1),
    pageSize: isPageSize(pageSize) ? pageSize : 20,
    search: url.searchParams.get('search'),
    status: url.searchParams.getAll('status').filter(isProposalStatus),
    trackId: url.searchParams.getAll('trackId'),
    level: url.searchParams.getAll('level').filter(isProposalLevel),
    format: url.searchParams.getAll('format').filter(isProposalFormat),
    reviewerId: url.searchParams.get('reviewerId'),
    sortBy: sortBy && isSortBy(sortBy) ? sortBy : null,
    sortOrder: sortOrder && isSortOrder(sortOrder) ? sortOrder : 'asc',
    owner: url.searchParams.get('owner'),
  };
};
