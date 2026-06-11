import { SxProps, Theme } from '@mui/material';

type Key = 'appbar';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    appbar: {
      position: 'static',
      gridArea: 'appbar',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: 2,
      bgcolor: 'background.paper',
    },
  };
};
