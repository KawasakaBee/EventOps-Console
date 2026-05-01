import { SxProps, Theme } from '@mui/material';

type Key =
  | 'filtersContainer'
  | 'filtersWrapper'
  | 'filterSearchInput'
  | 'filterInput';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    filtersContainer: {
      mb: 4,
    },
    filtersWrapper: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filterSearchInput: {
      width: 400,
      mb: 2,
    },
    filterInput: {
      minWidth: 220,
    },
  };
};
