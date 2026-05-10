import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'overviewHead'
  | 'overviewList'
  | 'overviewTitle'
  | 'abstractWrapper';

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
    abstractWrapper: {
      mb: 4,
    },
  };
};
