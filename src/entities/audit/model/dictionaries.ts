import { AuditAction, AuditEntity } from './types';

export const auditActionsDictionary: Record<AuditAction, string> = {
  created: 'Создано',
  updated: 'Обновлено',
  status_changed: 'Изменён статус',
  reviewer_assigned: 'Назначен ревьюер',
  comment_added: 'Добавлен комментарий',
  review_added: 'Добавлено ревью',
  scheduled: 'Добавлено в расписание',
  unscheduled: 'Удалено из расписания',
};

export const auditEntitiesDictionary: Record<AuditEntity, string> = {
  proposal: 'Заявка',
  scheduleSlot: 'Слот расписания',
  settings: 'Настройки',
};
