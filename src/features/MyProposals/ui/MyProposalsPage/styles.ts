import tabsSx from '@/shared/styles/tabsSx';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'myProposalsPageTabs';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    myProposalsPageTabs: tabsSx,
  };
};
