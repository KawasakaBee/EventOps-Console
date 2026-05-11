import { Route } from '@/shared/lib/routes/types';
import { Role } from './types';

export const routesByRole: Record<Role, Exclude<Route, '/login'>[]> = {
  admin: [
    '/dashboard',
    '/proposals',
    '/proposals/[id]',
    '/speakers',
    '/schedule',
    '/analytics',
    '/settings',
    '/audit',
  ],
  manager: [
    '/dashboard',
    '/proposals',
    '/proposals/[id]',
    '/speakers',
    '/schedule',
    '/analytics',
    '/settings',
    '/audit',
  ],
  reviewer: ['/proposals', '/proposals/[id]'],
  speaker: ['/submit', '/proposals/[id]', '/my-proposals'],
};

export const homePages = {
  admin: '/dashboard',
  manager: '/dashboard',
  reviewer: '/proposals',
  speaker: '/my-proposals',
} as const;
