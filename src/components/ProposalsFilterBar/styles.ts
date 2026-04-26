import { SxProps, Theme } from '@mui/material';

type Key = 'filtersWrapper' | 'filterSearchInput' | 'filterInput';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    filtersWrapper: {
      justifyContent: 'space-between',
    },
    filterSearchInput: {
      width: 400,
      mb: 2,
    },
    filterInput: {
      minWidth: 250,
    },
  };
};
