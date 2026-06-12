import type { SxProps, Theme } from '@mui/material';

type Key = 'chartWrapper' | 'chartLoader';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    chartWrapper: {
      width: '100%',
      minWidth: 0,
      height: 320,
    },
    chartLoader: {
      width: '100%',
      height: 320,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
};
