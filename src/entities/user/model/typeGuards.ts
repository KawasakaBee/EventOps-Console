import { DemoRole, demoRoles, Role, roles } from './types';

export const isRole = (value: unknown): value is Role =>
  typeof value === 'string' && roles.some((role) => role === value);

export const isDemoRole = (value: unknown): value is DemoRole =>
  typeof value === 'string' && demoRoles.some((role) => role === value);
