import { SxProps, Theme } from '@mui/material';

type Key = 'emptyStateContainer';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    emptyStateContainer: {
      alignItems: 'center',
    },
  };
};
