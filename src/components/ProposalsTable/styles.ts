import { SxProps, Theme } from '@mui/material';

type Key = 'table';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    table: {
      mb: 2,
    },
  };
};
