import {
  AuditSortBy,
  ID,
  PageSize,
  SortOrder,
} from '@/shared/types/primitives.types';
import { AuditAction, AuditEntity } from './types';

export interface AuditListQuery {
  page: number;
  pageSize: PageSize;
  search: string | null;
  action: AuditAction[];
  actorId: ID | null;
  entity: AuditEntity[];
  sortBy: AuditSortBy | null;
  sortOrder: SortOrder;
}
