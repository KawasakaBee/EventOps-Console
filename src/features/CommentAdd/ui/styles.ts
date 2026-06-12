import paperDialogSx from '@/shared/styles/paperDialogSx';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'commentAddDialogPaper' | 'commentAddDialogContent';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    commentAddDialogPaper: paperDialogSx,
    commentAddDialogContent: {
      width: 1,
    },
  };
};
