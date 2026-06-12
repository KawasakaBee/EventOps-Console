import paperDialogSx from '@/shared/styles/paperDialogSx';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'scheduleAssignDialogPaper' | 'scheduleAssignNoOptionText';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    scheduleAssignDialogPaper: paperDialogSx,
    scheduleAssignNoOptionText: {
      '& .MuiAutocomplete-noOptions': {
        color: 'text.primary',
      },
    },
  };
};
