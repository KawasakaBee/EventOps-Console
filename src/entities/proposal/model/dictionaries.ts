import {
  ProposalActionName,
  ProposalFormat,
  ProposalLevel,
  ProposalListRowAction,
  ProposalStatus,
} from './types';

export const statusDictionary: Record<ProposalStatus, string> = {
  draft: 'Черновик',
  submitted: 'Отправлена',
  in_review: 'На ревью',
  changes_requested: 'Запрошены изменения',
  accepted: 'Принята',
  rejected: 'Отклонена',
  scheduled: 'В расписании',
};

export const levelDictionary: Record<ProposalLevel, string> = {
  junior: 'Джуниор',
  middle: 'Миддл',
  senior: 'Сеньор',
};

export const formatDictionary: Record<ProposalFormat, string> = {
  lightning: 'Молния',
  talk: 'Беседа',
  workshop: 'Воркшоп',
};

export const proposalActionsDictionary: Record<
  ProposalListRowAction,
  ProposalActionName
> = {
  viewDetails: 'Просмотреть детали',
  assignReviewer: 'Назначить ревьюера',
  changeStatus: 'Изменить статус',
  addReview: 'Добавить ревью',
  edit: 'Редактировать',
};
