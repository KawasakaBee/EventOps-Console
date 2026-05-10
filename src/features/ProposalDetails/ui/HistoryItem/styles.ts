import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'itemTime' | 'itemChangesWrapper' | 'itemChanges';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    itemTime: {
      opacity: 0.5,
    },
    itemChangesWrapper: {
      alignItems: 'center',
    },
    itemChanges: {
      alignItems: 'center',
    },
  };
};
