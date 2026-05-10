import { ID, ISODateString } from '@/shared/types/primitives.types';

export interface AuditLog {
  id: ID;
  entityType: string;
  entityId: ID;
  action: string;
  actorId: ID;
  payload: Record<string, unknown>;
  createdAt: ISODateString;
}
