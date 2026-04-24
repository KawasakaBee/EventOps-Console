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

export const settings = [
  'Настойка события',
  'Настойка треков',
  'Настойка форматов',
  'Настойка критериев ревью',
  'Настойка длительности',
] as const;

export type Settings = (typeof settings)[number];
