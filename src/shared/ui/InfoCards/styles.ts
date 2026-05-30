import type { SxProps, Theme } from '@mui/material';

type Key = 'infoCardsWrapper' | 'infoCardContainer';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    infoCardsWrapper: {
      width: 1,
      mb: 2,
    },
    infoCardContainer: {
      '& .MuiPaper-root': {
        height: 1,
      },
    },
  };
};
