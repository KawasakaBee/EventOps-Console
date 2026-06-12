import { Role } from '@/entities/user/model/types';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'commentCardBioWrap'
  | 'commentCardAvatar'
  | 'commentCardUserName'
  | 'commentCardUserRole'
  | 'commentCardTimeWrap'
  | 'commentCardTime';

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
    commentCardBioWrap: {
      alignItems: 'center',
    },
    commentCardAvatar: {
      bgcolor: rolePalette[role],
    },
    commentCardUserName: {
      fontWeight: 900,
    },
    commentCardUserRole: {
      bgcolor: 'primary.main',
      color: 'text.secondary',
    },
    commentCardTimeWrap: {
      mb: 3,
    },
    commentCardTime: {
      opacity: 0.5,
    },
  };
};
