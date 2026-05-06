import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { CriticalAction } from '../../model/actions';

type Key = 'lastUpdateTime' | 'criticalButton' | 'statusButton';

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

  return {
    lastUpdateTime: {
      opacity: 0.5,
    },
    criticalButton: {
      bgcolor: buttonColor,
    },
    statusButton: {
      width: 1,
    },
  };
};
