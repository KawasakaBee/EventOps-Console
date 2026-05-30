import type { SxProps, Theme } from '@mui/material';

type Key = 'formControl' | 'searchInput';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    formControl: {
      minWidth: 220,
    },
    searchInput: {
      width: 400,
      mb: 2,
    },
  };
};
