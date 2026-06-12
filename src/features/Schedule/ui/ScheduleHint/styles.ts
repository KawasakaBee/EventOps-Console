import type { SxProps, Theme } from '@mui/material';

type Key = 'scheduleHint' | 'scheduleHintTooltip';

type IStyleProps = {
  column: number;
  startRow: number;
  endRow: number;
  hasOverlap: boolean;
};

type Style = (options: IStyleProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = (options) => {
  const { column, startRow, endRow, hasOverlap } = options;

  return {
    scheduleHint: {
      zIndex: 3,
      gridColumn: column,
      gridRowStart: startRow,
      gridRowEnd: endRow,
      p: 1.5,
      boxShadow: 'none',
      border: '2px solid',
      borderColor: hasOverlap ? 'error.main' : 'success.main',
      borderRadius: 1.5,
      background: `
      repeating-linear-gradient(
        45deg,
        transparent 0,
        transparent 8px,
        ${hasOverlap ? 'rgba(244, 67, 54, 1)' : 'rgba(76, 175, 80, 1)'} 8px,
        ${hasOverlap ? 'rgba(244, 67, 54, 1)' : 'rgba(76, 175, 80, 1)'} 10px
      )
    `,
    },
    scheduleHintTooltip: {
      bgcolor: hasOverlap ? 'error.main' : 'success.main',
    },
  };
};
