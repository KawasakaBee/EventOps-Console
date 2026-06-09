import type { SxProps, Theme } from '@mui/material';

type Key = 'attentionWrapper' | 'attentionCard';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    attentionWrapper: {
      height: 1,
      p: 2,
    },
    attentionCard: {
      height: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };
};
