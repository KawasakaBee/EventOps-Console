import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'dialogPaper' | 'dialogContent' | 'formControl' | 'formHelperTest';

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
    dialogContent: {
      width: 1,
    },
    formControl: {
      width: 1,
    },
    formHelperTest: {
      color: 'error.main',
    },
  };
};
