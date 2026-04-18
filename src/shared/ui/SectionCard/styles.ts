import { SxProps, Theme } from '@mui/material';

type Key = 'sectionCard';

type Styles = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Styles = () => {
  return {
    sectionCard: {
      p: 1,
      borderRadius: 1.5,
    },
  };
};
