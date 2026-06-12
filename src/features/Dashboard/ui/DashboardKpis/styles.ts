import type { SxProps, Theme } from '@mui/material';

type Key = 'dashboardKpisItemWrap' | 'dashboardKpisCard';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    dashboardKpisItemWrap: {
      height: 1,
      cursor: 'pointer',
    },
    dashboardKpisCard: {
      height: 1,
      p: 1.5,
      transition:
        'box-shadow 160ms ease, transform 160ms ease, border-color 160ms ease',

      '&:hover': {
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
        transform: 'translateY(-1px)',
        borderColor: 'primary.main',
      },

      '& h3': {
        cursor: 'pointer',
      },
    },
  };
};
