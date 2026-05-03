import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'popover' | 'snackbar';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    popover: {
      pointerEvents: 'none',
      '& .MuiPaper-root': {
        p: 1,
      },
    },
    snackbar: {
      width: 300,
    },
  };
};
