import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'overviewHead'
  | 'overviewList'
  | 'overviewTitle'
  | 'contentContainer'
  | 'abstractWrapper'
  | 'abstractDivider'
  | 'metadataContainer'
  | 'metadataWrapper';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    overviewHead: {
      mb: 4,
    },
    overviewList: {
      alignItems: 'center',
    },
    overviewTitle: {
      mb: 3,
    },
    contentContainer: {
      width: 1,
    },
    abstractWrapper: {
      p: 3,
      border: '1px solid',
      borderColor: 'neutral.main',
      borderRadius: '12px 0 0 12px',
      bgcolor: 'background.default',
    },
    abstractDivider: {
      mb: 1,
      borderColor: 'neutral.main',
    },
    metadataContainer: {
      alignContent: 'flex-start',
      p: 3,
      border: '1px solid',
      borderColor: 'neutral.main',
      borderRadius: '0 12px 12px 0',
      borderLeft: 0,
      bgcolor: 'background.default',
    },
    metadataWrapper: {
      alignItems: 'center',
    },
  };
};
