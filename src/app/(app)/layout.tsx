'use client';

import { AppBar, Box, Drawer, Typography } from '@mui/material';
import { styles } from './styles';
import { APPBAR_HEIGHT, SIDEBAR_WIDTH } from '@/shared/config/layout';
import Button from '@/shared/ui/Button/Button';
import { useRouter } from 'next/navigation';

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();

  const sx = styles({
    sidebarWidth: SIDEBAR_WIDTH,
    appbarHeight: APPBAR_HEIGHT,
  });

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'GET' });

      if (response.ok) {
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={sx.page}>
      <Drawer variant="permanent" sx={sx.sidebar}>
        <Typography variant="h2">This is sidebar</Typography>
      </Drawer>
      <AppBar sx={sx.appbar}>
        <Button
          mode="button"
          variant="contained"
          size="medium"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Typography variant="h2">This is AppBar</Typography>
      </AppBar>
      <Box sx={sx.content}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
