import {
  ProposalAction,
  ProposalActionName,
  ProposalListAction,
  ProposalListRowAction,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Permission } from '@/entities/user/model/permissions';
import { Role } from '@/entities/user/model/types';

export const permissionsByRole: Record<Role, Permission[]> = {
  admin: [
    'dashboard:view',
    'proposals:list',
    'proposals:view',
    'proposals:change-status',
    'review:assign',
    'speakers:list',
    'schedule:view',
    'schedule:assign',
    'audit:view',
    'settings:view',
    'settings:update',
  ],
  manager: [
    'dashboard:view',
    'proposals:list',
    'proposals:view',
    'proposals:update',
    'proposals:change-status',
    'review:assign',
    'review:comment',
    'speakers:list',
    'schedule:view',
    'schedule:assign',
    'audit:view',
    'settings:view',
  ],
  reviewer: [
    'proposals:list',
    'proposals:view',
    'review:create',
    'review:comment',
  ],
  speaker: ['proposals:view', 'proposals:create', 'proposals:update'],
};

export const proposalListActionsByRole: Record<Role, ProposalListAction[]> = {
  admin: ['assignReviewer', 'changeStatus'],
  manager: ['assignReviewer', 'changeStatus'],
  reviewer: [],
  speaker: [],
};

export const proposalListActionsByStatus: Record<
  ProposalStatus,
  ProposalListAction[]
> = {
  draft: [],
  submitted: ['assignReviewer', 'changeStatus'],
  rejected: ['changeStatus'],
  accepted: ['changeStatus'],
  changes_requested: ['changeStatus'],
  in_review: ['assignReviewer', 'changeStatus'],
  scheduled: ['changeStatus'],
};

export const proposalListRowActionsByRole: Record<
  Role,
  ProposalListRowAction[]
> = {
  admin: ['viewDetails', 'assignReviewer', 'changeStatus'],
  manager: ['viewDetails', 'assignReviewer', 'changeStatus'],
  reviewer: ['viewDetails', 'addReview'],
  speaker: ['viewDetails', 'edit'],
};

export const proposalListRowActionsByStatus: Record<
  ProposalStatus,
  ProposalListRowAction[]
> = {
  draft: ['viewDetails', 'edit'],
  submitted: ['viewDetails', 'assignReviewer', 'changeStatus'],
  rejected: ['viewDetails', 'changeStatus'],
  accepted: ['viewDetails', 'changeStatus'],
  changes_requested: ['viewDetails', 'changeStatus'],
  in_review: ['viewDetails', 'assignReviewer', 'changeStatus', 'addReview'],
  scheduled: ['viewDetails', 'changeStatus'],
};

export const availableActionsDictionary: Record<
  ProposalAction,
  ProposalActionName
> = {
  edit: 'Редактировать',
  submit: 'Отправить',
  assignReviewer: 'Назначить ревьюера',
  addReview: 'Добавить ревью',
  addComment: 'Прокомментировать',
  requestChanges: 'Запросить изменения',
  accept: 'Принять',
  reject: 'Отклонить',
  schedule: 'Добавить в расписание',
  changeStatus: 'Изменить статус',
  viewDetails: 'Просмотреть детали',
};
