import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'dialog'
  | 'dialogContainer'
  | 'statusContainer'
  | 'statusPrev'
  | 'statusNext'
  | 'formControl'
  | 'reasonInput'
  | 'buttonsContainer'
  | 'acceptButton'
  | 'rejectButton';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    dialog: {
      minWidth: 600,
      p: 4,
    },
    dialogContainer: {
      alignItems: 'center',
    },
    statusContainer: {
      alignItems: 'center',
    },
    statusPrev: {
      color: 'error.main',
    },
    statusNext: {
      color: 'success.main',
    },
    formControl: {
      width: 1,
    },
    reasonInput: {
      minHeight: 120,
    },
    buttonsContainer: {
      justifyContent: 'center',
    },
    acceptButton: {
      borderColor: 'success.main',
      color: 'text.secondary',
      bgcolor: 'success.main',
      '&:hover': {
        borderColor: 'success.darken',
        bgcolor: 'success.darken',
      },
    },
    rejectButton: {
      borderColor: 'error.main',
      color: 'text.secondary',
      bgcolor: 'error.main',
      '&:hover': {
        borderColor: 'error.darken',
        bgcolor: 'error.darken',
      },
    },
  };
};
