import { ID, ISODateString } from '@/shared/types/primitives.types';

export const auditActions = [
  'created',
  'updated',
  'status_changed',
  'reviewer_assigned',
  'comment_added',
  'review_added',
  'scheduled',
  'unscheduled',
] as const;

export type AuditAction = (typeof auditActions)[number];

export interface AuditLog {
  id: ID;
  entityType: AuditEntity;
  entityId: ID;
  eventId: ID;
  action: AuditAction;
  actorId: ID;
  payload: Record<string, unknown>;
  createdAt: ISODateString;
}

export const auditEntities = ['proposal', 'scheduleSlot', 'settings'] as const;

export type AuditEntity = (typeof auditEntities)[number];
