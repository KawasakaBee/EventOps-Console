import { AuditLog } from '@/entities/audit/model/types';
import {
  HistoryEntry,
  ScheduleSlotEntry,
} from '@/entities/history/model/types';

export const audit: AuditLog[] = [];

export const historyItemToAuditItem = (item: HistoryEntry): AuditLog => {
  return {
    id: item.id,
    entityType: 'proposal',
    entityId: item.proposalId,
    eventId: item.eventId,
    action: item.action,
    actorId: item.actorId,
    createdAt: item.createdAt,
    payload: item.payload ?? { default: 'Примечаний нет' },
  };
};

export const scheduleSlotToAuditItem = (item: ScheduleSlotEntry): AuditLog => {
  return {
    id: item.id,
    entityType: 'scheduleSlot',
    entityId: item.slotId,
    eventId: item.eventId,
    action: item.action,
    actorId: item.actorId,
    createdAt: item.createdAt,
    payload: { default: 'Примечаний нет' },
  };
};
