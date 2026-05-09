import { Tag } from '@/entities/tag/model/types';
import { ID, ISODateString } from '@/shared/types/primitives.types';

export const proposalStatuses = [
  'draft',
  'submitted',
  'in_review',
  'changes_requested',
  'accepted',
  'rejected',
  'scheduled',
] as const;

export type ProposalStatus = (typeof proposalStatuses)[number];

export const proposalFormats = ['talk', 'workshop', 'lightning'] as const;

export type ProposalFormat = (typeof proposalFormats)[number];

export const proposalLevels = ['junior', 'middle', 'senior'] as const;

export type ProposalLevel = (typeof proposalLevels)[number];

export const proposalActions = [
  'accept', //accepted
  'reject', //rejected
  'submit', //submitted
  'edit', //draft
  'schedule', //scheduled
  'assignReviewer', //in_review
  'addReview',
  'addComment',
  'requestChanges', //changes_requested
  'changeStatus', //all
  'viewDetails',
] as const;

export type ProposalAction = (typeof proposalActions)[number];

export const proposalActionsNames = [
  'Редактировать',
  'Отправить',
  'Назначить ревьюера',
  'Добавить ревью',
  'Прокомментировать',
  'Запросить изменения',
  'Принять',
  'Отклонить',
  'Добавить в расписание',
  'Изменить статус',
  'Просмотреть детали',
] as const;

export type ProposalActionName = (typeof proposalActionsNames)[number];

export interface Proposal {
  id: ID;
  title: string;
  abstract: string;
  format: ProposalFormat;
  level: ProposalLevel;
  duration: number;
  status: ProposalStatus;
  trackId: ID;
  speakerIds: ID[];
  tags: Tag[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type ProposalListItem = Pick<
  Proposal,
  'id' | 'title' | 'status' | 'format' | 'level' | 'trackId' | 'updatedAt'
> & {
  availableStatuses: ProposalStatus[];
};

export type ProposalEditPayload = Pick<
  Proposal,
  'title' | 'abstract' | 'format' | 'level' | 'duration' | 'trackId' | 'tags'
>;
