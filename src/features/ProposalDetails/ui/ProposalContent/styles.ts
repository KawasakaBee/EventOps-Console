import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'proposalTab' | 'tabCard';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalTab: {
      textTransform: 'initial',
      color: 'primary.main',
      '& .Mui-disabled': {
        color: 'text.disabled',
      },
    },
    tabCard: {
      p: 2,
      '& > h3': {
        mb: 3,
      },
    },
  };
};
