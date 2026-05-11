import type { Role } from './types';

export const permissions = [
  'dashboard:view',
  'proposals:list',
  'proposals:view',
  'proposals:create',
  'proposals:update',
  'proposals:change-status',
  'review:create',
  'review:assign',
  'review:comment',
  'speakers:list',
  'schedule:view',
  'schedule:assign',
  'audit:view',
  'settings:view',
  'settings:update',
] as const;

export type Permission = (typeof permissions)[number];

export const permissionsByRole: Record<Role, Permission[]> = {
  admin: [
    'dashboard:view',
    'proposals:list',
    'proposals:view',
    'proposals:change-status',
    'review:assign',
    'speakers:list',
    'schedule:view',
    'schedule:assign',
    'audit:view',
    'settings:view',
    'settings:update',
  ],
  manager: [
    'dashboard:view',
    'proposals:list',
    'proposals:view',
    'proposals:update',
    'proposals:change-status',
    'review:assign',
    'review:comment',
    'speakers:list',
    'schedule:view',
    'schedule:assign',
    'audit:view',
    'settings:view',
  ],
  reviewer: [
    'proposals:list',
    'proposals:view',
    'review:create',
    'review:comment',
  ],
  speaker: ['proposals:view', 'proposals:create', 'proposals:update'],
};
