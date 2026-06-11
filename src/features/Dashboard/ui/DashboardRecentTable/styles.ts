import type { SxProps, Theme } from '@mui/material';

type Key = 'emptyWrapper';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    emptyWrapper: {
      justifyContent: 'center',
      minHeight: 300,
    },
  };
};
