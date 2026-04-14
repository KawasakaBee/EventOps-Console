'use client';

import { theme } from '@/shared/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
