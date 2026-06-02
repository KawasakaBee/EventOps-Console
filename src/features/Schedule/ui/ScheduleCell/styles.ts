import type { SxProps, Theme } from '@mui/material';

type Key = 'slotCell' | 'slotContainer' | 'slotWrapper' | 'speakerName';

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
    slotCell: {
      zIndex: 2,
      gridColumn: column,
      gridRowStart: startRow,
      gridRowEnd: endRow,
      p: 1.5,
      boxShadow: 'none',
      border: '1px solid',
      bgcolor: 'background.paper',
      borderColor: 'purple.main',
      transition:
        'box-shadow 160ms ease, transform 160ms ease, border-color 160ms ease',

      '&:hover': {
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
        transform: 'translateY(-1px)',
        borderColor: 'primary.main',
      },
    },
    slotContainer: {
      height: 1,
      minHeight: 0,
      textDecoration: 'none',
      cursor: 'pointer',
      overflowY: 'auto',
    },
    slotWrapper: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    speakerName: {
      opacity: 0.5,
    },
  };
};
