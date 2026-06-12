import type { SxProps, Theme } from '@mui/material';

type Key = 'infoCards' | 'infoCardsItemContainer';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    infoCards: {
      width: 1,
      mb: 2,
    },
    infoCardsItemContainer: {
      '& .MuiPaper-root': {
        height: 1,
      },
    },
  };
};
