import paperDialogSx from '@/shared/styles/paperDialogSx';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'reviewerAssignDialogPaper'
  | 'reviewerAssignDialogContent'
  | 'reviewerAssignDialogControl'
  | 'reviewerAssignDialogHelperText';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    reviewerAssignDialogPaper: paperDialogSx,
    reviewerAssignDialogContent: {
      width: 1,
    },
    reviewerAssignDialogControl: {
      width: 1,
    },
    reviewerAssignDialogHelperText: {
      color: 'error.main',
    },
  };
};
