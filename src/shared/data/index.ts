export const routesByRole: Record<Role, Route[]> = {
  admin: [
    '/login',
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
    '/login',
    '/dashboard',
    '/proposals',
    '/proposals/[id]',
    '/speakers',
    '/schedule',
    '/analytics',
    '/settings',
    '/audit',
  ],
  reviewer: ['/login', '/proposals', '/proposals/[id]'],
  speaker: ['/login', '/proposals/[id]', '/submit', '/my-proposals'],
};

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

export const manager: CurrentUser = {
  id: '2',
  name: 'Manager',
  email: 'manager@gmail.com',
  role: 'manager',
  eventIds: [],
  permissions: permissionsByRole.manager,
};

export const reviewer: CurrentUser = {
  id: '3',
  name: 'Reviewer',
  email: 'reviewer@gmail.com',
  role: 'reviewer',
  eventIds: [],
  permissions: permissionsByRole.reviewer,
};

export const speaker: CurrentUser = {
  id: '4',
  name: 'Speaker',
  email: 'speaker@gmail.com',
  role: 'speaker',
  eventIds: [],
  permissions: permissionsByRole.speaker,
};
