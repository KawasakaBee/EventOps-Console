import type { SxProps, Theme } from '@mui/material';

type Key = 'scheduleEmpty';

type IStyleProps = {
  column: number;
  startRow: number;
  endRow: number;
};

type Style = (options: IStyleProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = (options) => {
  const { column, startRow, endRow } = options;

  return {
    scheduleEmpty: {
      zIndex: 0,
      gridColumn: column,
      gridRowStart: startRow,
      gridRowEnd: endRow,
      p: 1.5,
      boxShadow: 'none',
      border: '1px dashed',
      borderColor: 'divider',
      borderRadius: 1.5,
    },
  };
};
