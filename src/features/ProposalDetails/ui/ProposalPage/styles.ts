import { SxProps, Theme } from '@mui/material';

type Key = 'proposalTitleWrapper' | 'proposalStickyPanel';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalTitleWrapper: {
      alignItems: 'center',
      mb: 2,
    },
    proposalStickyPanel: {
      position: 'sticky',
      top: 0,
      zIndex: 1200,
      alignSelf: 'start',
    },
  };
};
