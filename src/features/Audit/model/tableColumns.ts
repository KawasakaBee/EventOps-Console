import { AuditLog } from '@/entities/audit/model/types';

export const auditListItemDictionary: Record<keyof AuditLog, string> = {
  id: 'ID действия',
  action: 'Действие',
  entityType: 'Сущность',
  entityId: 'ID сущности',
  actorId: 'Пользователь',
  payload: 'Примечание',
  createdAt: 'Время',
};

export const auditListItemKeys: (keyof AuditLog)[] = [
  'id',
  'action',
  'entityType',
  'entityId',
  'actorId',
  'payload',
  'createdAt',
];

export const auditTableWidthDictionary: Record<
  keyof AuditLog,
  { width: number; skeletonWidth: number }
> = {
  id: {
    width: 90,
    skeletonWidth: 70,
  },
  action: {
    width: 210,
    skeletonWidth: 190,
  },
  entityType: {
    width: 210,
    skeletonWidth: 190,
  },
  entityId: {
    width: 90,
    skeletonWidth: 70,
  },
  actorId: {
    width: 210,
    skeletonWidth: 190,
  },
  payload: {
    width: 210,
    skeletonWidth: 190,
  },
  createdAt: {
    width: 180,
    skeletonWidth: 140,
  },
};
