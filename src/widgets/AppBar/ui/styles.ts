import { SxProps, Theme } from '@mui/material';

type Key = 'link';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    link: {
      position: 'relative',
      display: 'inline',
      mb: 2,
      fontSize: 16,
      lineHeight: '1.2',
      color: 'text.primary',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: -2,
        width: 0,
        height: '1px',
        bgcolor: 'text.primary',
        transition: 'width .3s ease-in-out',
      },
      '&:hover': {
        '&::before': {
          width: 1,
        },
      },
    },
  };
};
