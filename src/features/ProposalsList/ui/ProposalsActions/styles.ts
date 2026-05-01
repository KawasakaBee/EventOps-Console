import { SxProps, Theme } from '@mui/material';

type Key = 'actionsWrapper';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    actionsWrapper: {
      alignItems: 'center',
    },
  };
};
