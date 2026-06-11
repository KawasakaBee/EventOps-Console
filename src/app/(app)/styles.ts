import { SxProps, Theme } from '@mui/material';

type Key = 'content';

type Styles = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Styles = () => {
  return {
    content: {
      gridArea: 'content',
      p: 2,
      overflowY: 'scroll',
    },
  };
};
