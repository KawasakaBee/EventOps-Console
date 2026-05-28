import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'payload';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    payload: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
};
