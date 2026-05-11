import { Route } from '@/shared/lib/routes/types';
import { Role } from '../model/types';
import { routesByRole } from '../model/routeAccess';

const canAccessRoute = (role: Role, route: Route): boolean => {
  if (route === '/login') return true;
  if (routesByRole[role].includes(route)) return true;
  return false;
};

export default canAccessRoute;
