import { Role, RoleName } from './types';

export const rolesDictionary: Record<Role, RoleName> = {
  admin: 'Администратор',
  manager: 'Менеджер',
  reviewer: 'Ревьюер',
  speaker: 'Спикер',
};
