import { SxProps, Theme } from '@mui/material';

type Key = 'table' | 'tableSortLabel';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    table: {
      mb: 2,
    },
    tableSortLabel: {
      '&.MuiTableSortLabel-root': {
        '&:hover': {
          color: 'text.primary',
          '& .MuiTableSortLabel-icon': {
            opacity: 1,
          },
        },
        '& .MuiTableSortLabel-icon': {
          opacity: 0.5,
        },
        '&.Mui-active': {
          '& .MuiTableSortLabel-icon': {
            color: 'text.primary',
            opacity: 1,
          },
        },
      },
    },
  };
};
