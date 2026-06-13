import type { SxProps, Theme } from '@mui/material';

type Key = 'summaryStep' | 'summaryStepFieldName';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    summaryStep: {
      p: 3,
    },
    summaryStepFieldName: {
      wordBreak: 'break-word',
    },
  };
};
