import type { SxProps, Theme } from '@mui/material';

type Key =
  | 'submitPageRecoveryDialogPaper'
  | 'submitPageSubmitDialogPaper'
  | 'submitPageDialogCentered';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    submitPageRecoveryDialogPaper: {
      minWidth: 600,
      p: 4,
      '&:focus-visible': {
        outline: 'none',
      },
    },
    submitPageSubmitDialogPaper: {
      minWidth: 600,
      p: 4,
      '&:focus-visible': {
        outline: 'none',
      },
    },
    submitPageDialogCentered: {
      textAlign: 'center',
    },
  };
};
