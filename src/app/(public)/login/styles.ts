import { SxProps, Theme } from '@mui/material';

type Key = 'login' | 'loginTitle' | 'loginActions' | 'loginButton';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    login: { p: 4 },
    loginTitle: { textAlign: 'center' },
    loginActions: { alignSelf: 'center' },
    loginButton: { minWidth: 320 },
  };
};
