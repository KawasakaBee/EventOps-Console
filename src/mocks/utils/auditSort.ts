import {
  auditActionsDictionary,
  auditEntitiesDictionary,
} from '@/entities/audit/model/dictionaries';
import { SortOrder } from '@/shared/types/primitives.types';
import { AuditLog } from '@/entities/audit/model/types';
import { AuditListQuery } from '@/entities/audit/model/query';

const sortByAuditId = (
  audit: AuditLog[],
  sortBy: 'id',
  sortOrder: SortOrder,
): AuditLog[] => {
  return audit.toSorted((a, b) => {
    return sortOrder === 'asc'
      ? a[sortBy].localeCompare(b[sortBy], 'en')
      : b[sortBy].localeCompare(a[sortBy], 'en');
  });
};

const sortByAuditEntityId = (
  audit: AuditLog[],
  sortBy: 'entityId',
  sortOrder: SortOrder,
): AuditLog[] => {
  return audit.toSorted((a, b) => {
    return sortOrder === 'asc'
      ? a[sortBy].localeCompare(b[sortBy], 'en')
      : b[sortBy].localeCompare(a[sortBy], 'en');
  });
};

const sortByAuditActorId = (
  audit: AuditLog[],
  sortBy: 'actorId',
  sortOrder: SortOrder,
): AuditLog[] => {
  return audit.toSorted((a, b) => {
    return sortOrder === 'asc'
      ? a[sortBy].localeCompare(b[sortBy], 'en')
      : b[sortBy].localeCompare(a[sortBy], 'en');
  });
};

const sortByAuditAction = (
  audit: AuditLog[],
  sortBy: 'action',
  sortOrder: SortOrder,
): AuditLog[] => {
  return audit.toSorted((a, b) => {
    const aValue = auditActionsDictionary[a[sortBy]];
    const bValue = auditActionsDictionary[b[sortBy]];

    return sortOrder === 'asc'
      ? aValue.localeCompare(bValue, 'ru')
      : bValue.localeCompare(aValue, 'ru');
  });
};

const sortByAuditEntity = (
  audit: AuditLog[],
  sortBy: 'entityType',
  sortOrder: SortOrder,
): AuditLog[] => {
  return audit.toSorted((a, b) => {
    const aValue = auditEntitiesDictionary[a[sortBy]];
    const bValue = auditEntitiesDictionary[b[sortBy]];

    return sortOrder === 'asc'
      ? aValue.localeCompare(bValue, 'ru')
      : bValue.localeCompare(aValue, 'ru');
  });
};

const sortByAuditCreatedTime = (
  audit: AuditLog[],
  sortBy: 'createdAt',
  sortOrder: SortOrder,
): AuditLog[] => {
  return audit.toSorted((a, b) => {
    const aValue = new Date(a[sortBy]).getTime();
    const bValue = new Date(b[sortBy]).getTime();

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });
};

export const applyAuditSort = (
  queryParams: AuditListQuery,
  audit: AuditLog[],
): AuditLog[] => {
  const sortBy = queryParams.sortBy;
  const sortOrder = queryParams.sortOrder;

  if (sortBy === 'id') return sortByAuditId(audit, sortBy, sortOrder);
  if (sortBy === 'entityType')
    return sortByAuditEntity(audit, sortBy, sortOrder);
  if (sortBy === 'entityId')
    return sortByAuditEntityId(audit, sortBy, sortOrder);
  if (sortBy === 'actorId') return sortByAuditActorId(audit, sortBy, sortOrder);
  if (sortBy === 'action') return sortByAuditAction(audit, sortBy, sortOrder);
  if (sortBy === 'createdAt')
    return sortByAuditCreatedTime(audit, sortBy, sortOrder);

  return sortByAuditCreatedTime(audit, 'createdAt', 'desc');
};
