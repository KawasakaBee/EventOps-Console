import { HistoryAction, HistoryActionName } from './types';

export const historyActionsDictionary: Record<
  HistoryAction,
  HistoryActionName
> = {
  created: 'Создано',
  updated: 'Обновлено',
  status_changed: 'Изменён статус',
  reviewer_assigned: 'Назначен ревьюер',
  comment_added: 'Добавлен комментарий',
  review_added: 'Добавлено ревью',
  scheduled: 'Добавлено в расписание',
  unscheduled: 'Удалено из расписания',
};
