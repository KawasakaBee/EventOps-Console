import type { SxProps, Theme } from '@mui/material';

type Key = 'durationRowCaption';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    durationRowCaption: {
      opacity: 0.5,
    },
  };
};
