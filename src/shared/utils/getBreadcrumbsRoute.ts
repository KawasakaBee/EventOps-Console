import { BreadcrumbsRoute } from '../types/primitives.types';
import { isBreadcrumbsRoute } from './typeGuards';

const getBreadcrumbsRoute = (pathname: string): BreadcrumbsRoute | null => {
  if (/^\/proposals\/[^/]+$/.test(pathname)) {
    return '/proposals/[id]';
  }

  return isBreadcrumbsRoute(pathname) ? pathname : null;
};

export default getBreadcrumbsRoute;
