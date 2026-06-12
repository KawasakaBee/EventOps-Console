import { SCHEDULE_STEP_MINUTES } from '@/shared/config/layout';
import type { Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

type Key = 'scheduleTime';

type IStyleProps = {
  rowDurationMinutes: number;
  startRow: number;
};

type Style = (options: IStyleProps) => {
  readonly [key in Key]: SystemStyleObject<Theme>;
};

export const styles: Style = (options) => {
  const { rowDurationMinutes, startRow } = options;

  return {
    scheduleTime: {
      zIndex: 1,
      gridRowStart: startRow,
      gridRowEnd: startRow + rowDurationMinutes / SCHEDULE_STEP_MINUTES,
      minHeight: 96,
      p: 1.5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'divider',
    },
  };
};
