import { users } from '../db/users';
import { AuditListQuery } from '@/entities/audit/model/query';
import { AuditLog } from '@/entities/audit/model/types';

export const applyAuditSearch = (
  queryParams: AuditListQuery,
  audit: AuditLog[],
): AuditLog[] => {
  const search = queryParams.search;
  if (!search) return audit;
  const normalizedSearch = search.trim().toLowerCase();

  const auditIdResult = audit.filter((item) =>
    item.id.toLowerCase().includes(normalizedSearch),
  );

  if (auditIdResult.length !== 0) return auditIdResult;

  return audit.filter((item) =>
    item.entityId.toLowerCase().includes(normalizedSearch),
  );
};

export const applyAuditFilters = (
  queryParams: AuditListQuery,
  audit: AuditLog[],
): AuditLog[] => {
  const actionSet = queryParams.action.length
    ? new Set(queryParams.action)
    : null;
  const entitySet = queryParams.entity.length
    ? new Set(queryParams.entity)
    : null;

  const actor = users.find((item) => item.id === queryParams.actorId);

  if (queryParams.actorId && !actor) return [];

  return audit.filter((item) => {
    return (
      (!actionSet || actionSet.has(item.action)) &&
      (!entitySet || entitySet.has(item.entityType)) &&
      (!actor || item.actorId === actor.id)
    );
  });
};
