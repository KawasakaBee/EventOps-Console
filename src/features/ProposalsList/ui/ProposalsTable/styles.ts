import getResponsiveValue from '@/shared/utils/getResponsiveValue';
import { SxProps, Theme } from '@mui/material';

type Key = 'table' | 'tableCheckbox' | 'tableSortLabel';

type IStyleProps = {
  viewportWidth: number;
};

type Style = (options: IStyleProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = (options) => {
  const { viewportWidth } = options;

  return {
    table: {
      mb: 2,

      '& .MuiTableCell-root': {
        p: getResponsiveValue(2, 1, 1920, 1440, viewportWidth),
      },
      '& .MuiCheckbox-root': {
        p: getResponsiveValue(1, 0.5, 1920, 1440, viewportWidth),
      },
    },
    tableCheckbox: {
      color: 'divider',
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
