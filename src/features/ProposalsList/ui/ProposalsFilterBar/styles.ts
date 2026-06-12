import { SxProps, Theme } from '@mui/material';

type Key = 'proposalsFilterBar' | 'proposalsFilterBarInput';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalsFilterBar: {
      mb: 4,
    },
    proposalsFilterBarInput: {
      width: 180,
    },
  };
};
