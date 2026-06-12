import { SxProps, Theme } from '@mui/material';

type Key = 'appLayoutContent';

type Styles = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Styles = () => {
  return {
    appLayoutContent: {
      gridArea: 'content',
      p: 2,
      overflowY: 'scroll',
    },
  };
};
