import { SxProps, Theme } from '@mui/material';

type Key = 'proposalPageTitleWrap' | 'proposalPageStickyPanel';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalPageTitleWrap: {
      alignItems: 'center',
      mb: 2,
    },
    proposalPageStickyPanel: {
      position: 'sticky',
      top: 0,
      zIndex: 1200,
      alignSelf: 'start',
    },
  };
};
