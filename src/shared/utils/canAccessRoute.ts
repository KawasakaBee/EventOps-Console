import { routesByRole } from '../data';

const canAccessRoute = (role: Role, route: Route): boolean => {
  if (routesByRole[role].includes(route)) return true;
  return false;
};

export default canAccessRoute;
