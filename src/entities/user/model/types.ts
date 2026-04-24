import { ID, Permission, Role } from '@/shared/types/primitives.types';

export interface User {
  id: ID;
  name: string;
  email: string;
  role: Role;
  eventIds: ID[];
  permissions: Permission[];
}
