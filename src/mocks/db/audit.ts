import { AuditLog } from '@/entities/audit/model/types';
import { HistoryEntry } from '@/entities/history/model/types';

export const audit: AuditLog[] = [];

export const historyItemToAuditItem = (item: HistoryEntry): AuditLog => {
  return {
    id: item.id,
    entityType: 'proposal',
    entityId: item.proposalId,
    action: item.action,
    actorId: item.actorId,
    createdAt: item.createdAt,
    payload: item.payload ?? { default: 'Примечаний нет' },
  };
};
