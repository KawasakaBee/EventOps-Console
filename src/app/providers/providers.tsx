'use client';

import { theme } from '@/shared/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import MswProvider from './MswProvider';
import StoreProvider from './StoreProvider';

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <MswProvider>
          <CssBaseline />
          {children}
        </MswProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default Providers;
