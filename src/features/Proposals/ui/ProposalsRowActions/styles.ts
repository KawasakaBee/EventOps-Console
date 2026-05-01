import { SxProps, Theme } from '@mui/material';

type Key = 'actionsContainer';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    actionsContainer: {
      alignItems: 'center',
    },
  };
};
