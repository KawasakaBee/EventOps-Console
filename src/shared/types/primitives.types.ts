import { PAGE_SIZE_OPTIONS } from '../config/layout';

export type ID = string;
export type ISODateString = string;

export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export const sortBy = [
  'id',
  'title',
  'status',
  'format',
  'level',
  'trackId',
  'eventId',
  'updatedAt',
] as const;

export type SortBy = (typeof sortBy)[number];

export const auditSortBy = [
  'id',
  'action',
  'entityType',
  'entityId',
  'eventId',
  'actorId',
  'createdAt',
] as const;

export type AuditSortBy = (typeof auditSortBy)[number];

export const sortOrder = ['asc', 'desc'] as const;

export type SortOrder = (typeof sortOrder)[number];
