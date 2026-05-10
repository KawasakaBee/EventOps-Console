'use client';

import { Drawer, Link } from '@mui/material';
import { ISidebarProps } from './Sidebar.types';
import NextLink from 'next/link';
import { isNavigationRoute } from '@/shared/utils/typeGuards';
import { navigationDictionary, routesByRole } from '@/shared/config/routes';
import { styles } from '@/widgets/AppBar/ui/styles';

const Sidebar: React.FC<ISidebarProps> = ({ role, sidebarSx }) => {
  const sx = styles();

  return (
    <Drawer variant="permanent" sx={sidebarSx}>
      {routesByRole[role].map((route) => {
        if (!isNavigationRoute(route)) return null;

        const path = navigationDictionary[route];

        return (
          <Link
            component={NextLink}
            key={route}
            href={route}
            underline="none"
            sx={sx.link}
          >
            {path}
          </Link>
        );
      })}
    </Drawer>
  );
};

export default Sidebar;
