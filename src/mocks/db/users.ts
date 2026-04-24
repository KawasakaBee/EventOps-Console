import { User } from '@/entities/user/model/types';
import { permissionsByRole } from '@/shared/data';

export const initialUsers = [
  {
    id: '1',
    name: 'User 1',
    email: 'user1@gmail.com',
    role: 'admin',
    eventIds: [],
    permissions: permissionsByRole.admin,
  },
  {
    id: '2',
    name: 'User 2',
    email: 'user2@gmail.com',
    role: 'manager',
    eventIds: [],
    permissions: permissionsByRole.manager,
  },
  {
    id: '3',
    name: 'User 3',
    email: 'user3@gmail.com',
    role: 'reviewer',
    eventIds: [],
    permissions: permissionsByRole.reviewer,
  },
  {
    id: '4',
    name: 'Speaker 4',
    email: 'speaker4@gmail.com',
    role: 'speaker',
    eventIds: [],
    permissions: permissionsByRole.speaker,
  },
  {
    id: '5',
    name: 'Speaker 5',
    email: 'speaker5@gmail.com',
    role: 'speaker',
    eventIds: [],
    permissions: permissionsByRole.speaker,
  },
] satisfies User[];

export const users: User[] = [...initialUsers];
