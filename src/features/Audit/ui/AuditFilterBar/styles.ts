import { SxProps, Theme } from '@mui/material';

type Key = 'auditFilterBar' | 'auditFilterBarInput';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    auditFilterBar: {
      mb: 4,
    },
    auditFilterBarInput: {
      minWidth: 360,
    },
  };
};
