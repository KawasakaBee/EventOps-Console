import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'userName' | 'commentWrapper' | 'commentTime';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    userName: {
      fontWeight: 900,
    },
    commentWrapper: {
      mb: 1,
    },
    commentTime: {
      opacity: 0.5,
    },
  };
};
