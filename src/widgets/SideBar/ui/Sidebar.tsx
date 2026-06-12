'use client';

import { Drawer, Link } from '@mui/material';
import NextLink from 'next/link';
import { isNavigationRoute } from '@/shared/lib/routes/typeGuards';
import { navigationDictionary } from '@/shared/lib/routes/dictionary';
import { routesByRole } from '@/entities/user/model/routeAccess';
import { styles } from './styles';
import { useAuth } from '@/entities/user/model/AuthProvider';

const Sidebar = () => {
  const { user } = useAuth();

  const sx = styles();

  return (
    <Drawer variant="permanent" sx={sx.sidebar}>
      {routesByRole[user.role].map((route) => {
        if (!isNavigationRoute(route)) return null;

        const path = navigationDictionary[route];

        return (
          <Link
            component={NextLink}
            key={route}
            href={route}
            underline="none"
            sx={sx.sidebarLink}
          >
            {path}
          </Link>
        );
      })}
    </Drawer>
  );
};

export default Sidebar;
