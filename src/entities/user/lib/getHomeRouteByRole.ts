import { Route } from '@/shared/lib/routes/types';
import { Role } from '../model/types';
import { homePages } from '../model/routeAccess';

const getHomeRouteByRole = (role: Role): Route => homePages[role];

export default getHomeRouteByRole;
