import {
  BreadcrumbsRoute,
  BreadcrumbsRouteName,
  NavigationRoute,
  NavigationRouteName,
} from './types';

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
