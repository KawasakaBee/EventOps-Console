import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'secondaryStickyButtonsSnackbar';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    secondaryStickyButtonsSnackbar: {
      width: 300,
    },
  };
};
