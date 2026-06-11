import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { normalizeRoute } from './shared/lib/routes/utils';
import canAccessRoute from './entities/user/lib/canAccessRoute';
import { AUTH_SESSION_COOKIE } from './shared/config/layout';
import {
  getHomeRouteByRole,
  getUserById,
} from './entities/user/lib/userSelectors';

export const proxy = (request: NextRequest) => {
  const userId = request.cookies.get(AUTH_SESSION_COOKIE)?.value;
  const path = request.nextUrl.pathname;
  const route = normalizeRoute(path);

  const redirectToLogin = NextResponse.redirect(new URL('/login', request.url));

  if (!userId) return redirectToLogin;

  const user = getUserById(userId);

  if (!user) return redirectToLogin;

  if (route) {
    const access = canAccessRoute(user.role, route);

    if (!access) {
      const homePage = getHomeRouteByRole(user.role);
      return NextResponse.redirect(new URL(homePage, request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/proposals/:path*',
    '/my-proposals/:path*',
    '/submit/:path*',
    '/schedule/:path*',
    '/analytics/:path*',
    '/settings/:path*',
    '/audit/:path*',
  ],
};
