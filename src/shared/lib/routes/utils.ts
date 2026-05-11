import { BreadcrumbsRoute, Route } from './types';
import { isBreadcrumbsRoute } from './typeGuards';

export const getBreadcrumbsRoute = (
  pathname: string,
): BreadcrumbsRoute | null => {
  if (/^\/proposals\/[^/]+$/.test(pathname)) {
    return '/proposals/[id]';
  }

  return isBreadcrumbsRoute(pathname) ? pathname : null;
};

export const normalizeRoute = (pathname: string): Route | null => {
  if (pathname === '/login') return '/login';
  if (pathname === '/dashboard') return '/dashboard';
  if (pathname === '/proposals') return '/proposals';
  if (/^\/proposals\/[^/]+$/.test(pathname)) return '/proposals/[id]';
  if (pathname === '/submit') return '/submit';
  if (pathname === '/my-proposals') return '/my-proposals';
  if (pathname === '/speakers') return '/speakers';
  if (pathname === '/schedule') return '/schedule';
  if (pathname === '/analytics') return '/analytics';
  if (pathname === '/settings') return '/settings';
  if (pathname === '/audit') return '/audit';

  return null;
};
