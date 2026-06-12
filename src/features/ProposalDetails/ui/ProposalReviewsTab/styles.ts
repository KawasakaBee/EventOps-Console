import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key = 'proposalReviewsTabSummary' | 'proposalReviewsTabSummaryItem';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalReviewsTabSummary: {
      alignItems: 'center',
      mb: 6,
    },
    proposalReviewsTabSummaryItem: {
      p: 2,
      border: '1px solid black',
      borderRadius: 1.5,
      bgcolor: 'background.default',
    },
  };
};
