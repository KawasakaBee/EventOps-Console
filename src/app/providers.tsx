'use client';

import { theme } from '@/shared/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import MswProvider from './msw-provider';

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <MswProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MswProvider>
  );
};

export default Providers;
