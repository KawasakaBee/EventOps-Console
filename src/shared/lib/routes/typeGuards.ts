import {
  BreadcrumbsRoute,
  breadcrumbsRoutes,
  NavigationRoute,
  navigationRoutes,
  Route,
  routes,
} from './types';

export const isRoute = (value: unknown): value is Route =>
  typeof value === 'string' && routes.some((route) => route === value);

export const isNavigationRoute = (value: unknown): value is NavigationRoute =>
  typeof value === 'string' &&
  navigationRoutes.some((route) => route === value);

export const isBreadcrumbsRoute = (value: unknown): value is BreadcrumbsRoute =>
  typeof value === 'string' &&
  breadcrumbsRoutes.some((route) => route === value);
