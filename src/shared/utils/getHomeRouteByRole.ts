import { Role, Route } from '../types/primitives.types';

const homePages = {
  admin: '/dashboard',
  manager: '/dashboard',
  reviewer: '/proposals',
  speaker: '/my-proposals',
} as const;

const getHomeRouteByRole = (role: Role): Route => homePages[role];

export default getHomeRouteByRole;
