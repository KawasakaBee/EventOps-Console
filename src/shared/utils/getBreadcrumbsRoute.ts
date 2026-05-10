import { BreadcrumbsRoute } from '../config/routes';
import { isBreadcrumbsRoute } from './typeGuards';

const getBreadcrumbsRoute = (pathname: string): BreadcrumbsRoute | null => {
  if (/^\/proposals\/[^/]+$/.test(pathname)) {
    return '/proposals/[id]';
  }

  return isBreadcrumbsRoute(pathname) ? pathname : null;
};

export default getBreadcrumbsRoute;
