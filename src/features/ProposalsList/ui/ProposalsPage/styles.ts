import { SxProps, Theme } from '@mui/material';

type Key = 'exportSnackbar';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    exportSnackbar: {
      width: 300,
    },
  };
};
