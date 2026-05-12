import type { SxProps, Theme } from '@mui/material';

type Key = 'durationCaption' | 'tracksWrapper';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    durationCaption: {
      opacity: 0.5,
    },
    tracksWrapper: {
      alignItems: 'flex-start',
    },
  };
};
