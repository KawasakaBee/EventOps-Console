import { SxProps, Theme } from '@mui/material';

type Key = 'pageHeader' | 'pageHeaderBackButton';

type Styles = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Styles = () => {
  return {
    pageHeader: {
      minHeight: 40,
      mb: 2,
      p: 2,
      bgcolor: 'background.paper',
      boxShadow: 3,
    },
    pageHeaderBackButton: {
      maxWidth: 200,
      mb: 2,
    },
  };
};
