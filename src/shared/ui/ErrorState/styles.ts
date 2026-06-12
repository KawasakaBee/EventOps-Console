import { SxProps, Theme } from '@mui/material';

type Key =
  | 'errorState'
  | 'errorStateSnackbar'
  | 'errorStateDialogPaper'
  | 'errorStateDialogTitleWrap'
  | 'errorStateDialogActions'
  | 'errorStateDialogButtons';

interface IStyleOptions {
  fullHeight: boolean;
}

type Style = (options: IStyleOptions) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = (options) => {
  const { fullHeight } = options;

  return {
    errorState: {
      height: fullHeight ? 1 : 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorStateSnackbar: {
      zIndex: 1800,
      maxWidth: 400,
      width: 'max-content',
    },
    errorStateDialogPaper: {
      minWidth: 400,
      p: 3,
    },
    errorStateDialogTitleWrap: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 1,
    },
    errorStateDialogActions: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorStateDialogButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 1,
      width: 1,
    },
  };
};
