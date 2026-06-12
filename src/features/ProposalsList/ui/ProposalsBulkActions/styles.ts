import { SxProps, Theme } from '@mui/material';

type Key = 'proposalsBulkActions';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalsBulkActions: {
      alignItems: 'center',
    },
  };
};
