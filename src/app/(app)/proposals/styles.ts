import { SxProps, Theme } from '@mui/material';

type Key = 'paginationWrapper';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    paginationWrapper: {
      alignItems: 'center',
    },
  };
};
