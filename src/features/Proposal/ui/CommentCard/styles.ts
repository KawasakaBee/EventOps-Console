import { Role } from '@/shared/types/primitives.types';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'bioWrapper'
  | 'avatar'
  | 'userName'
  | 'userRole'
  | 'timeWrapper'
  | 'commentTime';

interface IStyleOptionProps {
  role: Role;
}

type Style = (options: IStyleOptionProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

const rolePalette = {
  admin: 'admin.main',
  manager: 'manager.main',
  reviewer: 'reviewer.main',
  speaker: 'speaker.main',
};

export const styles: Style = (options) => {
  const { role } = options;

  return {
    bioWrapper: {
      alignItems: 'center',
    },
    avatar: {
      bgcolor: rolePalette[role],
    },
    userName: {
      fontWeight: 900,
    },
    userRole: {
      bgcolor: 'primary.main',
      color: 'text.secondary',
    },
    timeWrapper: {
      mb: 3,
    },
    commentTime: {
      opacity: 0.5,
    },
  };
};
