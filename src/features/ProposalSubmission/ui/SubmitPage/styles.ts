import type { SxProps, Theme } from '@mui/material';

type Key =
  | 'recoveryDialogPaper'
  | 'submitDialogPaper'
  | 'recoveryDialogTitle'
  | 'submitDialogTitle'
  | 'recoveryDialogContent'
  | 'submitDialogContent'
  | 'recoveryDialogActions'
  | 'submitDialogActions'
  | 'submitCircularProgress';

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
    submitDialogPaper: {
      minWidth: 600,
      p: 4,
      '&:focus-visible': {
        outline: 'none',
      },
    },
    recoveryDialogTitle: {
      textAlign: 'center',
    },
    submitDialogTitle: {
      textAlign: 'center',
    },
    recoveryDialogContent: {
      textAlign: 'center',
    },
    submitDialogContent: {
      textAlign: 'center',
    },
    recoveryDialogActions: {
      justifyContent: 'center',
    },
    submitDialogActions: {
      justifyContent: 'center',
    },
    submitCircularProgress: {
      alignSelf: 'center',
    },
  };
};
