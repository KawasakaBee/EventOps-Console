import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'reviewCardContainer'
  | 'reviewCardReviewerWrapper'
  | 'reviewerCardScoreWrapper';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    reviewCardContainer: {
      p: 1,
      border: '1px solid black',
      borderRadius: 1.5,
      backgroundColor: 'background.default',
    },
    reviewCardReviewerWrapper: {
      alignItems: 'center',
    },
    reviewerCardScoreWrapper: {
      mb: 2,
    },
  };
};
