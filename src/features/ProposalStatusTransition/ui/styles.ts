import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'proposalStatusTransitionDialogPaper'
  | 'proposalStatusTransitionDialogContainer'
  | 'proposalStatusTransitionDialogStatus'
  | 'proposalStatusTransitionDialogStatusPrev'
  | 'proposalStatusTransitionDialogStatusNext'
  | 'proposalStatusTransitionDialogReasonControl'
  | 'proposalStatusTransitionDialogReasonInput'
  | 'proposalStatusTransitionDialogActions';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    proposalStatusTransitionDialogPaper: {
      minWidth: 600,
      p: 4,
    },
    proposalStatusTransitionDialogContainer: {
      alignItems: 'center',
    },
    proposalStatusTransitionDialogStatus: {
      alignItems: 'center',
    },
    proposalStatusTransitionDialogStatusPrev: {
      color: 'error.main',
    },
    proposalStatusTransitionDialogStatusNext: {
      color: 'success.main',
    },
    proposalStatusTransitionDialogReasonControl: {
      width: 1,
    },
    proposalStatusTransitionDialogReasonInput: {
      minHeight: 120,
    },
    proposalStatusTransitionDialogActions: {
      justifyContent: 'center',
    },
  };
};
