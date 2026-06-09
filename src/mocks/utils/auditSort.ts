import {
  auditActionsDictionary,
  auditEntitiesDictionary,
} from '@/entities/audit/model/dictionaries';
import { SortOrder } from '@/shared/types/primitives.types';
import { AuditLog } from '@/entities/audit/model/types';
import { AuditListQuery } from '@/entities/audit/model/query';
import { events } from '../db/events';

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

const sortByEventId = (
  audit: AuditLog[],
  sortBy: 'eventId',
  sortOrder: SortOrder,
): AuditLog[] => {
  const eventsById = new Map(events.map((event) => [event.id, event]));

  return audit.toSorted((a, b) => {
    const aValue = eventsById.get(a[sortBy]);
    const bValue = eventsById.get(b[sortBy]);

    if (!aValue || !bValue) {
      return sortOrder === 'asc'
        ? Number(a[sortBy]) - Number(b[sortBy])
        : Number(b[sortBy]) - Number(a[sortBy]);
    }

    return sortOrder === 'asc'
      ? aValue.title.localeCompare(bValue.title, 'ru')
      : bValue.title.localeCompare(aValue.title, 'ru');
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
  if (sortBy === 'eventId') return sortByEventId(audit, sortBy, sortOrder);
  if (sortBy === 'actorId') return sortByAuditActorId(audit, sortBy, sortOrder);
  if (sortBy === 'action') return sortByAuditAction(audit, sortBy, sortOrder);
  if (sortBy === 'createdAt')
    return sortByAuditCreatedTime(audit, sortBy, sortOrder);

  return sortByAuditCreatedTime(audit, 'createdAt', 'desc');
};
