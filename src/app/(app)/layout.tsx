import { AppBar, Box, Drawer, Typography } from '@mui/material';
import { styles } from './styles';
import { APPBAR_HEIGHT, SIDEBAR_WIDTH } from '@/shared/config/layout';

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const sx = styles({
    sidebarWidth: SIDEBAR_WIDTH,
    appbarHeight: APPBAR_HEIGHT,
  });

  return (
    <Box sx={sx.page}>
      <Drawer variant="permanent" sx={sx.sidebar}>
        <Typography variant="h2">This is sidebar</Typography>
      </Drawer>
      <AppBar sx={sx.appbar}>
        <Typography variant="h2">This is AppBar</Typography>
      </AppBar>
      <Box sx={sx.content}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
