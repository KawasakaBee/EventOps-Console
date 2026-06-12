import type { SxProps, Theme } from '@mui/material';

type Key = 'DashboardAttentionItems' | 'DashboardAttentionItemsCard';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    DashboardAttentionItems: {
      height: 1,
      p: 2,
    },
    DashboardAttentionItemsCard: {
      height: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };
};
