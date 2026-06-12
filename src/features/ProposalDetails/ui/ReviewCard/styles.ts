import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'reviewCard' | 'reviewCardReviewerWrap' | 'reviewCardScoreWrap';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    reviewCard: {
      p: 1,
      border: '1px solid black',
      borderRadius: 1.5,
      backgroundColor: 'background.default',
    },
    reviewCardReviewerWrap: {
      alignItems: 'center',
    },
    reviewCardScoreWrap: {
      mb: 2,
    },
  };
};
