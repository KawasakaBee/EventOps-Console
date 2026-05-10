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
