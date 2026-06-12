import type { SxProps, Theme } from '@mui/material';

type Key = 'extraStepTagsWrap' | 'extraStepConsentCheckbox';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    extraStepTagsWrap: {
      alignItems: 'flex-start',
    },
    extraStepConsentCheckbox: {
      color: 'primary.main',
    },
  };
};
