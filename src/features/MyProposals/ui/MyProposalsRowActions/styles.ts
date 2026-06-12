import { SxProps, Theme } from '@mui/material';

type Key = 'myProposalsRowActionsContainer';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    myProposalsRowActionsContainer: {
      alignItems: 'center',
    },
  };
};
