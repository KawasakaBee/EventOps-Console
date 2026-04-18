type Role = 'admin' | 'manager' | 'reviewer' | 'speaker';

type Route =
  | '/login'
  | '/dashboard'
  | '/proposals'
  | '/proposals/[id]'
  | '/submit'
  | '/my-proposals'
  | '/speakers'
  | '/schedule'
  | '/analytics'
  | '/settings'
  | '/audit';

type Permission =
  | 'dashboard:view'
  | 'proposals:list'
  | 'proposals:view'
  | 'proposals:create'
  | 'proposals:update'
  | 'proposals:change-status'
  | 'review:create'
  | 'review:assign'
  | 'review:comment'
  | 'speakers:list'
  | 'schedule:view'
  | 'schedule:assign'
  | 'audit:view'
  | 'settings:view'
  | 'settings:update';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  eventIds: string[];
  permissions: Permission[];
}

interface DemoLoginRequest {
  role: Exclude<Role, 'admin'>;
}
