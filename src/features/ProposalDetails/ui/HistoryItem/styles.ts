import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'itemTime'
  | 'timelineContent'
  | 'timelineContentWrapper'
  | 'itemChangesContainer'
  | 'timelineChanges'
  | 'itemChangesWrapper'
  | 'itemChanges'
  | 'changesPrev'
  | 'changesNext';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    itemTime: {
      opacity: 0.5,
    },
    timelineContent: {
      minWidth: 0,
    },
    timelineContentWrapper: {
      minWidth: 0,
    },
    itemChangesContainer: {
      alignItems: 'center',
    },
    timelineChanges: {
      minWidth: 0,
    },
    itemChangesWrapper: {
      alignItems: 'center',
      paddingBlock: 4,
    },
    itemChanges: {
      alignItems: 'center',
    },
    changesPrev: {
      minWidth: 0,
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
    },
    changesNext: {
      minWidth: 0,
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
    },
  };
};
