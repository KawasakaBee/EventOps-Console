import { AuditListQuery } from '@/entities/audit/model/query';
import { AuditLog } from '@/entities/audit/model/types';

export const paginateAudit = (
  queryParams: AuditListQuery,
  audit: AuditLog[],
): AuditLog[] => {
  const start = (queryParams.page - 1) * queryParams.pageSize;
  const end = start + queryParams.pageSize;

  const slicedAudit = audit.slice(start, end);

  return slicedAudit;
};
