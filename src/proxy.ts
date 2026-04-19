import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import canAccessRoute from './shared/utils/canAccessRoute';
import getHomeRouteByRole from './shared/utils/getHomeRouteByRole';

const proxy = (request: NextRequest) => {
  const role = request.cookies.get('demo-role')?.value as
    | DemoLoginRequest['role']
    | undefined;
  const path = request.nextUrl.pathname as Route;

  if (role) {
    const access = canAccessRoute(role, path);

    if (!access) {
      const homePage = getHomeRouteByRole(role);
      return NextResponse.redirect(new URL(homePage, request.url));
    }
  }

  return NextResponse.next();
};

export default proxy;

export const config = {
  matcher: ['/dashboard/:path*', '/proposals/:path*', '/my-proposals/:path*'],
};
