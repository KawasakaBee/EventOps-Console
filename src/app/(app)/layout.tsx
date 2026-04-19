import { Box, Drawer, Typography } from '@mui/material';
import { styles } from './styles';
import { APPBAR_HEIGHT, SIDEBAR_WIDTH } from '@/shared/config/layout';
import AppBar from '@/components/AppBar/AppBar';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const AppLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const sx = styles({
    sidebarWidth: SIDEBAR_WIDTH,
    appbarHeight: APPBAR_HEIGHT,
  });

  const hasSession = async (): Promise<boolean> => {
    try {
      const cookiesStore = await cookies();
      const role = cookiesStore.get('demo-role')?.value;

      if (!role) return false;

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const user = await hasSession();
  if (!user) redirect('/login');

  return (
    <Box sx={sx.page}>
      <Drawer variant="permanent" sx={sx.sidebar}>
        <Typography variant="h2">This is sidebar</Typography>
      </Drawer>
      <AppBar sx={sx.appbar} />
      <Box sx={sx.content}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
