import { Role } from '@/entities/user/model/types';

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

export const navigationDictionary: Record<
  NavigationRoute,
  NavigationRouteName
> = {
  '/dashboard': 'Панель управления',
  '/proposals': 'Заявки',
  '/submit': 'Создать заявку',
  '/my-proposals': 'Мои заявки',
  '/speakers': 'Спикеры',
  '/schedule': 'Расписание',
  '/analytics': 'Аналитика',
  '/settings': 'Настройки',
  '/audit': 'Аудит',
};

export const breadcrumbsDictionary: Record<
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
