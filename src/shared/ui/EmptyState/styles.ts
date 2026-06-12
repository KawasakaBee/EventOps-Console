import { SxProps, Theme } from '@mui/material';

type Key = 'emptyState';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    emptyState: {
      alignItems: 'center',
    },
  };
};
