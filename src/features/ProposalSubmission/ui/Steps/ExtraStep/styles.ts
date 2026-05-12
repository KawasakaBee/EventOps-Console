import type { SxProps, Theme } from '@mui/material';

type Key = 'tagsWrapper' | 'consentCheckbox';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    tagsWrapper: {
      alignItems: 'flex-start',
    },
    consentCheckbox: {
      color: 'primary.main',
    },
  };
};
