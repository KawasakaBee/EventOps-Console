import { Box } from '@mui/material';
import { styles } from './styles';
import { APPBAR_HEIGHT, SIDEBAR_WIDTH } from '@/shared/config/layout';
import AppBar from '@/features/AppBar/ui/AppBar';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Sidebar from '@/components/Sidebar/Sidebar';
import { isRole } from '@/shared/utils/typeGuards';

const AppLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cookiesStore = await cookies();
  const role = cookiesStore.get('demo-role')?.value;

  const sx = styles({
    sidebarWidth: SIDEBAR_WIDTH,
    appbarHeight: APPBAR_HEIGHT,
  });

  const hasSession = async (): Promise<boolean> => {
    try {
      if (!role) return false;

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const user = await hasSession();
  if (!user || !isRole(role)) redirect('/login');

  return (
    <Box sx={sx.page}>
      <Sidebar role={role} sidebarSx={sx.sidebar} />
      <AppBar sx={sx.appbar} />
      <Box sx={sx.content}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
