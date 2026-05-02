import { User } from '@/entities/user/model/types';
import {
  BreadcrumbsRoute,
  BreadcrumbsRouteName,
  HistoryActionName,
  NavigationRoute,
  NavigationRouteName,
  Permission,
  ProposalListActions,
  ProposalListRowActions,
  Role,
  RoleName,
  Route,
} from '../types/primitives.types';
import {
  ProposalFormat,
  ProposalLevel,
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { ErrorEnvelope } from '../types/api.types';
import {
  Recommendation,
  RecommendationName,
} from '@/entities/review/model/types';
import { HistoryAction } from '@/entities/history/model/types';

export const routesByRole: Record<Role, Exclude<Route, '/login'>[]> = {
  admin: [
    '/dashboard',
    '/proposals',
    '/proposals/[id]',
    '/speakers',
    '/schedule',
    '/analytics',
    '/settings',
    '/audit',
  ],
  manager: [
    '/dashboard',
    '/proposals',
    '/proposals/[id]',
    '/speakers',
    '/schedule',
    '/analytics',
    '/settings',
    '/audit',
  ],
  reviewer: ['/proposals', '/proposals/[id]'],
  speaker: ['/submit', '/proposals/[id]', '/my-proposals'],
};

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

export const proposalListActionsByRole: Record<Role, ProposalListActions[]> = {
  admin: ['assignReviewer', 'changeStatus'],
  manager: ['assignReviewer', 'changeStatus'],
  reviewer: [],
  speaker: [],
};

export const proposalListActionsByStatus: Record<
  ProposalStatus,
  ProposalListActions[]
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
  ProposalListRowActions[]
> = {
  admin: ['viewDetails', 'assignReviewer', 'changeStatus'],
  manager: ['viewDetails', 'assignReviewer', 'changeStatus'],
  reviewer: ['viewDetails', 'createReview'],
  speaker: ['viewDetails', 'editDraft'],
};

export const proposalListRowActionsByStatus: Record<
  ProposalStatus,
  ProposalListRowActions[]
> = {
  draft: ['viewDetails', 'editDraft'],
  submitted: ['viewDetails', 'assignReviewer', 'changeStatus'],
  rejected: ['viewDetails', 'changeStatus'],
  accepted: ['viewDetails', 'changeStatus'],
  changes_requested: ['viewDetails', 'changeStatus'],
  in_review: ['viewDetails', 'assignReviewer', 'changeStatus', 'createReview'],
  scheduled: ['viewDetails', 'changeStatus'],
};

export const manager: User = {
  id: '2',
  name: 'Manager',
  email: 'manager@gmail.com',
  role: 'manager',
  eventIds: ['1'],
  permissions: permissionsByRole.manager,
};

export const reviewer: User = {
  id: '3',
  name: 'Reviewer',
  email: 'reviewer@gmail.com',
  role: 'reviewer',
  eventIds: ['1'],
  permissions: permissionsByRole.reviewer,
};

export const speaker: User = {
  id: '4',
  name: 'Speaker',
  email: 'speaker@gmail.com',
  role: 'speaker',
  eventIds: ['1'],
  permissions: permissionsByRole.speaker,
};

export const navigationDicrionary: Map<NavigationRoute, NavigationRouteName> =
  new Map([
    ['/dashboard', 'Панель управления'],
    ['/proposals', 'Заявки'],
    ['/submit', 'Создать заявку'],
    ['/my-proposals', 'Мои заявки'],
    ['/speakers', 'Спикеры'],
    ['/schedule', 'Расписание'],
    ['/analytics', 'Аналитика'],
    ['/settings', 'Настройки'],
    ['/audit', 'Аудит'],
  ]);

export const breadcrumbsDicrionary: Record<
  BreadcrumbsRoute,
  BreadcrumbsRouteName
> = {
  '/dashboard': 'Панель управления',
  '/proposals': 'Заявки',
  '/proposals/[id]': 'Заявка',
  '/submit': 'Создать заявку',
  '/my-proposals': 'Мои заявки',
  '/speakers': 'Спикеры',
  '/schedule': 'Расписание',
  '/analytics': 'Аналитика',
  '/settings': 'Настройки',
  '/audit': 'Аудит',
};

export const statusDictionary: Map<ProposalStatus, string> = new Map([
  ['draft', 'Черновик'],
  ['submitted', 'Отправлена'],
  ['in_review', 'На ревью'],
  ['changes_requested', 'Запрошены изменения'],
  ['accepted', 'Принята'],
  ['rejected', 'Отклонена'],
  ['scheduled', 'В расписании'],
]);

export const levelDictionary: Map<ProposalLevel, string> = new Map([
  ['junior', 'Джуниор'],
  ['middle', 'Миддл'],
  ['senior', 'Сеньор'],
]);

export const formatDictionary: Map<ProposalFormat, string> = new Map([
  ['lightning', 'Молния'],
  ['talk', 'Беседа'],
  ['workshop', 'Воркшоп'],
]);

export const proposalListItemDictionary: Map<
  keyof ProposalListItem | 'actions' | 'checkbox',
  string
> = new Map([
  ['checkbox', ''],
  ['id', 'ID'],
  ['title', 'Название'],
  ['status', 'Статус'],
  ['format', 'Формат'],
  ['level', 'Уровень'],
  ['trackId', 'Трек'],
  ['updatedAt', 'Последнее обновление'],
  ['actions', 'Доступные действия'],
]);

export const proposalListItemKeys: (
  | keyof ProposalListItem
  | 'actions'
  | 'checkbox'
)[] = [
  'checkbox',
  'id',
  'title',
  'status',
  'format',
  'level',
  'trackId',
  'updatedAt',
  'actions',
];

export const proposalActionsDictionary: Map<ProposalListRowActions, string> =
  new Map([
    ['viewDetails', 'Просмотреть детали'],
    ['assignReviewer', 'Назначить ревьюера'],
    ['changeStatus', 'Изменить статус'],
    ['createReview', 'Создать ревью'],
    ['editDraft', 'Редактировать черновик'],
  ]);

export const proposalTableWidthDictionary: Record<
  keyof ProposalListItem | 'actions' | 'checkbox',
  { width: number; skeletonWidth: number }
> = {
  checkbox: {
    width: 40,
    skeletonWidth: 20,
  },
  id: {
    width: 90,
    skeletonWidth: 70,
  },
  title: {
    width: 460,
    skeletonWidth: 420,
  },
  status: {
    width: 210,
    skeletonWidth: 190,
  },
  format: {
    width: 120,
    skeletonWidth: 100,
  },
  level: {
    width: 120,
    skeletonWidth: 100,
  },
  trackId: {
    width: 180,
    skeletonWidth: 160,
  },
  updatedAt: {
    width: 180,
    skeletonWidth: 160,
  },
  actions: {
    width: 260,
    skeletonWidth: 240,
  },
};

export const fallbackError: ErrorEnvelope['error'] = {
  code: 'NETWORK_ERROR',
  message: 'Не удалось выполнить запрос',
};

export const recommendationDicrionary: Record<
  Recommendation,
  RecommendationName
> = {
  approve: 'Принять',
  reject: 'Отклонить',
  request_changes: 'Нужны изменения',
};

export const tabsDictionary: Record<number, string> = {
  0: 'Информация',
  1: 'Ревью',
  2: 'Комментарии',
  3: 'История',
};

export const rolesDictionary: Record<Role, RoleName> = {
  admin: 'Администратор',
  manager: 'Менеджер',
  reviewer: 'Ревьюер',
  speaker: 'Спикер',
};

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
