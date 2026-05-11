import { ID } from '@/shared/types/primitives.types';
import type { Permission } from './permissions';

export interface User {
  id: ID;
  name: string;
  email: string;
  role: Role;
  eventIds: ID[];
  permissions: Permission[];
}

export type UserListItem = Pick<User, 'name' | 'id'>;

export const roles = ['admin', 'manager', 'reviewer', 'speaker'] as const;

export type Role = (typeof roles)[number];

export const demoRoles = roles.filter((role) => role !== 'admin');

export type DemoRole = (typeof demoRoles)[number];

export const roleNames = [
  'Администратор',
  'Менеджер',
  'Ревьюер',
  'Спикер',
] as const;

export type RoleName = (typeof roleNames)[number];
