import { PostDraftSpeakerRequest } from '@/entities/speaker/api/schema';
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

export const criticalActions = proposalActions.filter(
  (action) =>
    action === 'edit' ||
    action === 'submit' ||
    action === 'accept' ||
    action === 'reject',
);

export type CriticalAction = (typeof criticalActions)[number];

export const additionalActions = proposalActions.filter(
  (action) =>
    action === 'addComment' ||
    action === 'assignReviewer' ||
    action === 'addReview' ||
    action === 'requestChanges' ||
    action === 'schedule' ||
    action === 'changeStatus',
);

export type AdditionalAction = (typeof additionalActions)[number];

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
  takeaways: string;
  targetAudience: string;
  prerequisites: string;
  format: ProposalFormat;
  level: ProposalLevel;
  duration: number;
  status: ProposalStatus;
  trackId: ID;
  ownerId: ID;
  speakerIds: ID[];
  tags: Tag[];
  notes: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  draftSpeakers: PostDraftSpeakerRequest[];
}

export type ProposalListItem = Pick<
  Proposal,
  'id' | 'title' | 'status' | 'format' | 'level' | 'trackId' | 'updatedAt'
> & {
  availableStatuses: ProposalStatus[];
};

export const proposalEditableKeys = [
  'status',
  'title',
  'abstract',
  'takeaways',
  'targetAudience',
  'prerequisites',
  'format',
  'level',
  'duration',
  'trackId',
  'speakerIds',
  'tags',
  'notes',
  'draftSpeakers',
] as const satisfies readonly (keyof ProposalEditPayload)[];

export type ProposalEditPayload = Pick<
  Proposal,
  | 'status'
  | 'title'
  | 'abstract'
  | 'takeaways'
  | 'targetAudience'
  | 'prerequisites'
  | 'format'
  | 'level'
  | 'duration'
  | 'trackId'
  | 'speakerIds'
  | 'tags'
  | 'notes'
  | 'draftSpeakers'
>;

export const proposalListActions = proposalActions.filter(
  (action) => action === 'assignReviewer' || action === 'changeStatus',
);

export type ProposalListAction = (typeof proposalListActions)[number];

export const proposalListRowActions = proposalActions.filter(
  (action) =>
    action === 'assignReviewer' ||
    action === 'changeStatus' ||
    action === 'viewDetails' ||
    action === 'addReview' ||
    action === 'edit',
);

export type ProposalListRowAction = (typeof proposalListRowActions)[number];
