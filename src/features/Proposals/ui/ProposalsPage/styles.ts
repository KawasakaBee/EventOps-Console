import { SxProps, Theme } from '@mui/material';

type Key = 'paginationWrapper' | 'exportSnackbar';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    paginationWrapper: {
      alignItems: 'center',
    },
    exportSnackbar: {
      width: 300,
    },
  };
};
