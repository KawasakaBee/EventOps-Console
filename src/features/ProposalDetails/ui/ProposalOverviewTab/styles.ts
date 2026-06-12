import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'proposalOverviewTabHead'
  | 'proposalOverviewTabList'
  | 'proposalOverviewTabTitle'
  | 'proposalOverviewTabContent'
  | 'proposalOverviewTabAbstractWrap'
  | 'proposalOverviewTabAbstractDivider'
  | 'proposalOverviewTabMetadata';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalOverviewTabHead: {
      mb: 4,
    },
    proposalOverviewTabList: {
      alignItems: 'center',
    },
    proposalOverviewTabTitle: {
      mb: 3,
    },
    proposalOverviewTabContent: {
      width: 1,
    },
    proposalOverviewTabAbstractWrap: {
      p: 3,
      border: '1px solid',
      borderColor: 'neutral.main',
      borderRadius: '12px 0 0 12px',
      bgcolor: 'background.default',
    },
    proposalOverviewTabAbstractDivider: {
      mb: 1,
      borderColor: 'neutral.main',
    },
    proposalOverviewTabMetadata: {
      alignContent: 'flex-start',
      p: 3,
      border: '1px solid',
      borderColor: 'neutral.main',
      borderRadius: '0 12px 12px 0',
      borderLeft: 0,
      bgcolor: 'background.default',
    },
  };
};
