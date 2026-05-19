import type { SxProps, Theme } from '@mui/material';

type Key =
  | 'dialogPaper'
  | 'dialogContentWrapper'
  | 'titleSkeleton'
  | 'dialogStatusError'
  | 'dialogStatusSuccess'
  | 'dialogActions';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    dialogPaper: {
      minWidth: 500,
      p: 4,
    },
    dialogContentWrapper: {
      justifyContent: 'center',
      ml: -4,
    },
    titleSkeleton: {
      alignSelf: 'center',
    },
    dialogStatusError: {
      color: 'error.main',
    },
    dialogStatusSuccess: {
      color: 'success.main',
    },
    dialogActions: {
      justifyContent: 'center',
    },
  };
};
