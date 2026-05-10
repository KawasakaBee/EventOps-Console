import { timelineItemClasses } from '@mui/lab';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'timeline';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    timeline: {
      [`& .${timelineItemClasses.root}:before`]: {
        flex: 0,
        padding: 0,
      },
    },
  };
};
