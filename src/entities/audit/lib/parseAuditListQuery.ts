import parsePositiveInt from '@/shared/utils/parsePositiveInt';
import { isPageSize, isSortOrder } from '@/shared/utils/typeGuards';
import { AuditListQuery } from '../model/query';
import {
  isAuditAction,
  isAuditEntity,
  isAuditSortBy,
} from '../model/typeGuards';

export const parseAuditListQuery = (requestUrl: string): AuditListQuery => {
  const url = new URL(requestUrl, 'http://localhost');
  const pageSize = parsePositiveInt(url.searchParams.get('pageSize'), 20);

  const sortBy = url.searchParams.get('sortBy');
  const sortOrder = url.searchParams.get('sortOrder');

  return {
    page: parsePositiveInt(url.searchParams.get('page'), 1),
    pageSize: isPageSize(pageSize) ? pageSize : 20,
    search: url.searchParams.get('search'),
    action: url.searchParams.getAll('action').filter(isAuditAction),
    actorId: url.searchParams.get('actorId'),
    entity: url.searchParams.getAll('entity').filter(isAuditEntity),
    sortBy: sortBy && isAuditSortBy(sortBy) ? sortBy : null,
    sortOrder: sortOrder && isSortOrder(sortOrder) ? sortOrder : 'asc',
  };
};
