import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import canAccessRoute from './shared/utils/canAccessRoute';
import getHomeRouteByRole from './shared/utils/getHomeRouteByRole';
import normalizeRoute from './shared/utils/normalizeRoute';
import { isDemoRole } from './shared/utils/typeGuards';

const proxy = (request: NextRequest) => {
  const role = request.cookies.get('demo-role')?.value;
  const path = request.nextUrl.pathname;
  const route = normalizeRoute(path);

  if (isDemoRole(role) && route) {
    const access = canAccessRoute(role, route);

    if (!access) {
      const homePage = getHomeRouteByRole(role);
      return NextResponse.redirect(new URL(homePage, request.url));
    }
  }

  return NextResponse.next();
};

export default proxy;

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/proposals/:path*',
    '/my-proposals/:path*',
    '/submit/:path*',
    '/speakers/:path*',
    '/schedule/:path*',
    '/analytics/:path*',
    '/settings/:path*',
    '/audit/:path*',
  ],
};
