import paperDialogSx from '@/shared/styles/paperDialogSx';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'reviewCreateDialogPaper' | 'reviewCreateDialogContent';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    reviewCreateDialogPaper: paperDialogSx,
    reviewCreateDialogContent: {
      width: 1,
    },
  };
};
