import type { SxProps, Theme } from '@mui/material';

type Key =
  | 'recoveryDialogPaper'
  | 'recoveryDialogTitle'
  | 'recoveryDialogContent'
  | 'recoveryDialogActions';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    recoveryDialogPaper: {
      minWidth: 600,
      p: 4,
      '&:focus-visible': {
        outline: 'none',
      },
    },
    recoveryDialogTitle: {
      textAlign: 'center',
    },
    recoveryDialogContent: {
      textAlign: 'center',
    },
    recoveryDialogActions: {
      justifyContent: 'center',
    },
  };
};
