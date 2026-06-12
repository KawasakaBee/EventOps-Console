import paperDialogSx from '@/shared/styles/paperDialogSx';
import type { SxProps, Theme } from '@mui/material';

type Key = 'settingsPageDialogPaper';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    settingsPageDialogPaper: paperDialogSx,
  };
};
