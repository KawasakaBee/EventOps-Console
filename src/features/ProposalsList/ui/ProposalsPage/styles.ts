import { SxProps, Theme } from '@mui/material';

type Key = 'proposalsPageSnackbar';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalsPageSnackbar: {
      width: 300,
    },
  };
};
