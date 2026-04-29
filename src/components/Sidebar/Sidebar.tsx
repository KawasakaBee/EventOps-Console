'use client';

import { Drawer, Link } from '@mui/material';
import { ISidebarPropos } from './Sidebar.types';
import { routesByRole, routesDictionary } from '@/shared/data';
import NextLink from 'next/link';
import { styles } from '../../features/AppBar/ui/styles';

const Sidebar: React.FC<ISidebarPropos> = ({ role, sidebarSx }) => {
  const sx = styles();

  return (
    <Drawer variant="permanent" sx={sidebarSx}>
      {routesByRole[role].map((route) => {
        const path = routesDictionary.get(route);
        if (!path) return null;
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
