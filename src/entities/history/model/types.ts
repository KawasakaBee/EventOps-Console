import { Proposal } from '@/entities/proposal/model/types';
import { ID, ISODateString } from '@/shared/types/primitives.types';

export const historyActions = [
  'created',
  'updated',
  'status_changed',
  'reviewer_assigned',
  'comment_added',
  'review_added',
  'scheduled',
  'unscheduled',
] as const;

export type HistoryAction = (typeof historyActions)[number];

export interface ProposalFieldChange {
  field: keyof Proposal;
  previousValue: unknown;
  nextValue: unknown;
}

export interface HistoryEntry {
  id: ID;
  proposalId: ID;
  actorId: ID;
  action: HistoryAction;
  createdAt: ISODateString;
  changes?: ProposalFieldChange[];
  payload?: Record<string, unknown>;
}

export const historyActionNames = [
  'Создано',
  'Обновлено',
  'Изменён статус',
  'Назначен ревьюер',
  'Добавлен комментарий',
  'Добавлено ревью',
  'Добавлено в расписание',
  'Удалено из расписания',
] as const;

export type HistoryActionName = (typeof historyActionNames)[number];
