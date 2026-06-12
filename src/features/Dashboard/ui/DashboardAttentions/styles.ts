import type { SxProps, Theme } from '@mui/material';

type Key = 'dashboardAttentions' | 'dashboardAttentionsCard';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    dashboardAttentions: {
      height: 1,
      p: 2,
    },
    dashboardAttentionsCard: {
      height: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };
};
