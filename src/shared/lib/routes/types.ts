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
