import { SxProps, Theme } from '@mui/material';

type Key = 'proposalTitleWrapper';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalTitleWrapper: {
      alignItems: 'center',
      mb: 2,
    },
  };
};
