import { User } from '@/entities/user/model/types';
import { permissionsByRole } from '@/shared/config/permissions';

export const manager: User = {
  id: '2',
  name: 'Manager',
  email: 'manager@gmail.com',
  role: 'manager',
  eventIds: ['1'],
  permissions: permissionsByRole.manager,
};

export const reviewer: User = {
  id: '3',
  name: 'Reviewer',
  email: 'reviewer@gmail.com',
  role: 'reviewer',
  eventIds: ['1'],
  permissions: permissionsByRole.reviewer,
};

export const speaker: User = {
  id: '4',
  name: 'Speaker',
  email: 'speaker@gmail.com',
  role: 'speaker',
  eventIds: ['1'],
  permissions: permissionsByRole.speaker,
};
