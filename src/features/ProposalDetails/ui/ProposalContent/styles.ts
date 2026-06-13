import tabsSx from '@/shared/styles/tabsSx';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'proposalContentTabsWrap'
  | 'proposalContentTabs'
  | 'proposalContentTabCard';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalContentTabsWrap: { flexWrap: 'wrap' },
    proposalContentTabs: tabsSx,
    proposalContentTabCard: {
      p: 2,
      '& > h3': {
        mb: 3,
      },
    },
  };
};
