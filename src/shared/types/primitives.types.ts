import { proposalActions } from '@/entities/proposal/model/types';
import { PAGE_SIZE_OPTIONS } from '../config/layout';

export type ID = string;
export type ISODateString = string;

export const roles = ['admin', 'manager', 'reviewer', 'speaker'] as const;

export type Role = (typeof roles)[number];

export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export const routes = [
  '/login',
  '/dashboard',
  '/proposals',
  '/proposals/[id]',
  '/submit',
  '/my-proposals',
  '/speakers',
  '/schedule',
  '/analytics',
  '/settings',
  '/audit',
] as const;

export type Route = (typeof routes)[number];

export const navigationRoutes = routes.filter(
  (route) => route !== '/login' && route !== '/proposals/[id]',
);

export type NavigationRoute = (typeof navigationRoutes)[number];

export const breadcrumbsRoutes = routes.filter((route) => route !== '/login');

export type BreadcrumbsRoute = (typeof breadcrumbsRoutes)[number];

export const routesNames = [
  'Авторизация',
  'Панель управления',
  'Заявки',
  'Заявка',
  'Создать заявку',
  'Мои заявки',
  'Спикеры',
  'Расписание',
  'Аналитика',
  'Настройки',
  'Аудит',
] as const;

export type RouteName = (typeof routesNames)[number];

export const navigationRoutesNames = routesNames.filter(
  (name) => name !== 'Авторизация' && name !== 'Заявка',
);

export type NavigationRouteName = (typeof navigationRoutesNames)[number];

export const breadcrumbsRoutesNames = routesNames.filter(
  (name) => name !== 'Авторизация',
);

export type BreadcrumbsRouteName = (typeof breadcrumbsRoutesNames)[number];

export const permissions = [
  'dashboard:view',
  'proposals:list',
  'proposals:view',
  'proposals:create',
  'proposals:update',
  'proposals:change-status',
  'review:create',
  'review:assign',
  'review:comment',
  'speakers:list',
  'schedule:view',
  'schedule:assign',
  'audit:view',
  'settings:view',
  'settings:update',
] as const;

export type Permission = (typeof permissions)[number];

export const errorCodes = [
  'INVALID_ROLE',
  'ROLE_NOT_FOUND',
  'USER_NOT_FOUND',
  'PROPOSAL_NOT_FOUND',
  'REVIEWER_NOT_FOUND',
  'HISTORY_NOT_FOUND',
  'FORBIDDEN',
  'INVALID_QUERY',
  'NETWORK_ERROR',
  'INVALID_RESPONSE',
  'UNKNOWN_ERROR',
  'CLIPBOARD_ERROR',
] as const;

export type ErrorCode = (typeof errorCodes)[number];

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

export const sortBy = [
  'id',
  'title',
  'status',
  'format',
  'level',
  'trackId',
  'updatedAt',
] as const;

export type SortBy = (typeof sortBy)[number];

export const sortOrder = ['asc', 'desc'] as const;

export type SortOrder = (typeof sortOrder)[number];

export const pageStatuses = ['idle', 'loading', 'success', 'error'] as const;

export type PageStatus = (typeof pageStatuses)[number];

export const roleNames = [
  'Администратор',
  'Менеджер',
  'Ревьюер',
  'Спикер',
] as const;

export type RoleName = (typeof roleNames)[number];

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

export const proposalDetailsTabs = [
  'overview',
  'reviews',
  'comments',
  'history',
] as const;

export type ProposalDetailsTab = (typeof proposalDetailsTabs)[number];
