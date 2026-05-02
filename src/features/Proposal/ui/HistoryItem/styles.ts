import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'itemTime' | 'itemPayload';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    itemTime: {
      opacity: 0.5,
    },
    itemPayload: {
      whiteSpace: 'pre-line',
    },
  };
};
