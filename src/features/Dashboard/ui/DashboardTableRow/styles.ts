import type { SxProps, Theme } from '@mui/material';

type Key = 'dashboardRow';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    dashboardRow: {
      cursor: 'pointer',
      transition:
        'box-shadow 150ms ease, transform 150ms ease, background-color 150ms ease',

      '&:hover': {
        position: 'relative',
        zIndex: 1,
        boxShadow: 2,
        transform: 'translateY(-1px)',
        backgroundColor: 'background.paper',
      },
    },
  };
};
