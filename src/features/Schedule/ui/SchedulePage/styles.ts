import { SCHEDULE_STEP_HEIGHT } from '@/shared/config/layout';
import type { SxProps, Theme } from '@mui/material';

type Key = 'scheduleContainer' | 'scheduleWrapper';

type IStyleProps = {
  tracksLength: number;
  rowsCount: number;
};

type Style = (options: IStyleProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = (options) => {
  const { tracksLength, rowsCount } = options;

  return {
    scheduleContainer: { overflowX: 'auto' },
    scheduleWrapper: {
      display: 'grid',
      gridTemplateColumns: `140px repeat(${tracksLength}, minmax(220px, 1fr))`,
      gridTemplateRows: `auto repeat(${rowsCount === 0 ? 50 : rowsCount}, ${SCHEDULE_STEP_HEIGHT}px)`,
      columnGap: 1.5,
      rowGap: 0,
      minWidth: 140 + tracksLength * 220,
      alignItems: 'stretch',
    },
  };
};
