import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'auditTableRowPayload';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    auditTableRowPayload: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
};
