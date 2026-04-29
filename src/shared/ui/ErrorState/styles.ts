import { SxProps, Theme } from '@mui/material';

type Key =
  | 'errorStateContainer'
  | 'snackbar'
  | 'dialogPaper'
  | 'dialogTitleWrapper'
  | 'dialogActions'
  | 'dialogButtons';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    errorStateContainer: {
      alignItems: 'center',
    },
    snackbar: {
      zIndex: 1800,
      maxWidth: 400,
      width: 'max-content',
    },
    dialogPaper: {
      minWidth: 400,
      p: 3,
    },
    dialogTitleWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 1,
    },
    dialogActions: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialogButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 1,
      width: 1,
    },
  };
};
