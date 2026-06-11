import { SxProps, Theme } from '@mui/material';

type Key = 'filtersContainer' | 'filterSearchInput' | 'filterInput';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    filtersContainer: {
      mb: 4,
    },
    filterSearchInput: {
      width: 400,
      mb: 2,
    },
    filterInput: {
      minWidth: 360,
    },
  };
};
