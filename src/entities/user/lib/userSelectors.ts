import { homePages } from '@/entities/user/model/routeAccess';
import { DemoRole, Role, User } from '@/entities/user/model/types';
import { users } from '@/mocks/db/users';
import { ID } from '@/shared/types/primitives.types';
import { Route } from 'next';

export const getHomeRouteByRole = (role: Role): Route => homePages[role];

export const getUserById = (id: ID): User | undefined =>
  users.find((user) => user.id === id);

const demoUserIdsByRole = {
  manager: '2',
  reviewer: '3',
  speaker: '4',
} satisfies Record<DemoRole, ID>;

export const getDemoUserByRole = (role: DemoRole): User | undefined => {
  const userId = demoUserIdsByRole[role];
  return getUserById(userId);
};
