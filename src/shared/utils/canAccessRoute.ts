import { Role } from '@/entities/user/model/types';
import { Route, routesByRole } from '../config/routes';

const canAccessRoute = (role: Role, route: Route): boolean => {
  if (route === '/login') return true;
  if (routesByRole[role].includes(route)) return true;
  return false;
};

export default canAccessRoute;
