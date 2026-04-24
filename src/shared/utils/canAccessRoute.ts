import { routesByRole } from '../data';
import { Role, Route } from '../types/primitives.types';

const canAccessRoute = (role: Role, route: Route): boolean => {
  if (routesByRole[role].includes(route)) return true;
  return false;
};

export default canAccessRoute;
