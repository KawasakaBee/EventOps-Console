import type { SxProps, Theme } from '@mui/material';

type Key = 'basicStepTracksWrap';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    basicStepTracksWrap: {
      alignItems: 'flex-start',
    },
  };
};
