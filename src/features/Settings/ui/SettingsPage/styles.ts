import type { SxProps, Theme } from '@mui/material';

type Key = 'dialogPaper';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    dialogPaper: {
      alignItems: 'center',
      minWidth: 600,
      p: 4,
      '& .MuiDialogTitle-root + .MuiDialogContent-root': {
        pt: 2,
      },
    },
  };
};
