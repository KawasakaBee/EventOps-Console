import { SxProps, Theme } from '@mui/material';

type Key = 'proposalsRowActions';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalsRowActions: {
      alignItems: 'center',
    },
  };
};
