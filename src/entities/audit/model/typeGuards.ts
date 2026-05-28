import { auditSortBy, AuditSortBy } from '@/shared/types/primitives.types';
import { AuditAction, auditActions, auditEntities, AuditEntity } from './types';

export const isAuditAction = (value: unknown): value is AuditAction =>
  typeof value === 'string' && auditActions.some((action) => action === value);

export const isAuditEntity = (value: unknown): value is AuditEntity =>
  typeof value === 'string' && auditEntities.some((entity) => entity === value);

export const isAuditSortBy = (value: unknown): value is AuditSortBy =>
  typeof value === 'string' && auditSortBy.some((option) => option === value);
