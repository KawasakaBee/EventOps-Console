import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'historyItemTime'
  | 'historyTimeLineContent'
  | 'historyItemChangesWrap'
  | 'historyItemChangesContainer'
  | 'historyTimeLineChanges'
  | 'historyItemChangesWrapper'
  | 'historyItemChanges'
  | 'historyItemChangesPrev'
  | 'historyItemChangesNext'
  | 'historyItemPayload';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    historyItemTime: {
      opacity: 0.5,
    },
    historyTimeLineContent: {
      minWidth: 0,
      p: 3,
    },
    historyItemChangesWrap: {
      minWidth: 0,
    },
    historyItemChangesContainer: {
      alignItems: 'center',
    },
    historyTimeLineChanges: {
      minWidth: 0,
    },
    historyItemChangesWrapper: {
      alignItems: 'center',
    },
    historyItemChanges: {
      alignItems: 'center',
    },
    historyItemChangesPrev: {
      minWidth: 0,
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
    },
    historyItemChangesNext: {
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
    },
    historyItemPayload: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
};
