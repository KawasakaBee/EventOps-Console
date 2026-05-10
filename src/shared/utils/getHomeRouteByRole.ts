import { Role } from '@/entities/user/model/types';
import { Route } from 'next';

const homePages = {
  admin: '/dashboard',
  manager: '/dashboard',
  reviewer: '/proposals',
  speaker: '/my-proposals',
} as const;

const getHomeRouteByRole = (role: Role): Route => homePages[role];

export default getHomeRouteByRole;
