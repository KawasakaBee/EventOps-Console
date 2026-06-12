import type { SxProps, Theme } from '@mui/material';

type Key = 'dashboardRecentTableEmptyWrap';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    dashboardRecentTableEmptyWrap: {
      justifyContent: 'center',
      minHeight: 300,
    },
  };
};
