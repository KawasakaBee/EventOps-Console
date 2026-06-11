import { SxProps, Theme } from '@mui/material';

type Key = 'filtersContainer' | 'filterInput';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    filtersContainer: {
      mb: 4,
    },
    filterInput: {
      width: 180,
    },
  };
};
