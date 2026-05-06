'use client';

import { Drawer, Link } from '@mui/material';
import { ISidebarProps } from './Sidebar.types';
import { routesByRole, navigationDicrionary } from '@/shared/data';
import NextLink from 'next/link';
import { styles } from '../../features/AppBar/ui/styles';
import { isNavigationRoute } from '@/shared/utils/typeGuards';

const Sidebar: React.FC<ISidebarProps> = ({ role, sidebarSx }) => {
  const sx = styles();

  return (
    <Drawer variant="permanent" sx={sidebarSx}>
      {routesByRole[role].map((route) => {
        if (!isNavigationRoute(route)) return null;

        const path = navigationDicrionary[route];

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
