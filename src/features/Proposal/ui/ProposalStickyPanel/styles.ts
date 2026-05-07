import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { CriticalAction } from '../../model/actions';

type Key =
  | 'statusWrapper'
  | 'lastUpdateTime'
  | 'criticalButton'
  | 'statusButton'
  | 'skeletonButton';

interface IStyleOptionProps {
  action: CriticalAction;
}

type Style = (options: IStyleOptionProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = (options) => {
  const { action } = options;

  const buttonColor =
    action === 'accept'
      ? 'success.main'
      : action === 'reject'
        ? 'error.main'
        : 'primary.main';

  const hoverColor =
    action === 'accept'
      ? 'success.darken'
      : action === 'reject'
        ? 'error.darken'
        : 'primary.main';

  return {
    statusWrapper: {
      alignItems: 'flex-start',
    },
    lastUpdateTime: {
      opacity: 0.5,
    },
    criticalButton: {
      width: 1,
      borderColor: buttonColor,
      color: 'text.secondary',
      bgcolor: buttonColor,
      '&:hover': {
        borderColor: hoverColor,
        bgcolor: hoverColor,
      },
    },
    statusButton: {
      width: 1,
    },
    skeletonButton: {
      height: 60,
    },
  };
};
