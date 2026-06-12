'use client';

import { Box, useMediaQuery } from '@mui/material';
import { styles } from './styles';
import { APPBAR_HEIGHT, SIDEBAR_WIDTH } from '@/shared/config/layout';
import useViewportWidth from '@/shared/utils/hooks/useViewportWidth';
import { theme } from '@/shared/theme/theme';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const viewportWidth = useViewportWidth();
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

  const sx = styles({
    sidebarWidth: SIDEBAR_WIDTH(isDesktop, viewportWidth),
    appbarHeight: APPBAR_HEIGHT,
  });

  return <Box sx={sx.pageWrapper}>{children}</Box>;
};

export default PageWrapper;
