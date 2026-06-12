import type { SxProps, Theme } from '@mui/material';

type Key = 'paginationControl';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    paginationControl: {
      alignItems: 'center',
    },
  };
};
