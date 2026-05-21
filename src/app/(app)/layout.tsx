import { Box } from '@mui/material';
import { styles } from './styles';
import {
  APPBAR_HEIGHT,
  AUTH_SESSION_COOKIE,
  SIDEBAR_WIDTH,
} from '@/shared/config/layout';
import Sidebar from '@/widgets/SideBar/ui/Sidebar';
import AppBar from '@/widgets/AppBar/ui/AppBar';
import { AuthProvider } from '@/entities/user/model/AuthProvider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserById } from '@/entities/user/lib/userSelectors';

const AppLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const userId = cookieStore.get(AUTH_SESSION_COOKIE)?.value;

  const user = userId ? getUserById(userId) : null;

  if (!user) redirect('/login');

  const sx = styles({
    sidebarWidth: SIDEBAR_WIDTH,
    appbarHeight: APPBAR_HEIGHT,
  });

  return (
    <AuthProvider initialUser={user}>
      <Box sx={sx.page}>
        <Sidebar sidebarSx={sx.sidebar} />
        <AppBar sx={sx.appbar} />
        <Box sx={sx.content}>{children}</Box>
      </Box>
    </AuthProvider>
  );
};

export default AppLayout;
