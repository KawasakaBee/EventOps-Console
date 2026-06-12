import type { SxProps, Theme } from '@mui/material';

type Key = 'searchInput' | 'searchInputField';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    searchInput: {
      minWidth: 220,
    },
    searchInputField: {
      width: 400,
      mb: 2,
    },
  };
};
