import { Box } from '@mui/material';
import { styles } from './styles';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import Sidebar from '@/widgets/SideBar/ui/Sidebar';
import AppBar from '@/widgets/AppBar/ui/AppBar';
import { AuthProvider } from '@/entities/user/model/AuthProvider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserById } from '@/entities/user/lib/userSelectors';
import PageWrapper from '@/widgets/PageWrapper/ui/PageWrapper';

const AppLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const userId = cookieStore.get(AUTH_SESSION_COOKIE)?.value;

  const user = userId ? getUserById(userId) : null;

  if (!user) redirect('/login');

  const sx = styles();

  return (
    <AuthProvider initialUser={user}>
      <PageWrapper>
        <Sidebar />
        <AppBar />
        <Box sx={sx.content}>{children}</Box>
      </PageWrapper>
    </AuthProvider>
  );
};

export default AppLayout;
