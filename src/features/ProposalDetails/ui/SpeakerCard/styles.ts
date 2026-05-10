import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'cardWrapper'
  | 'headingWrapper'
  | 'cardNameWrapper'
  | 'cardInfoWrapper'
  | 'cardInfoEmailWrapper'
  | 'cardInfoEmail'
  | 'cardContactsWrapper'
  | 'contactsIcon'
  | 'pastTalks'
  | 'avatarSkeleton';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    cardWrapper: {
      p: 2,
      border: '2px solid',
      borderColor: 'primary.main',
      borderRadius: 1.5,
    },
    headingWrapper: {
      justifyContent: 'space-between',
    },
    cardNameWrapper: {
      alignItems: 'center',
    },
    cardInfoWrapper: {
      p: 2,
      border: '1px dotted',
      borderColor: 'text.disabled',
      borderRadius: 1.5,
    },
    cardInfoEmailWrapper: {
      alignItems: 'center',
    },
    cardInfoEmail: {
      border: 0,
    },
    cardContactsWrapper: {
      alignItems: 'center',
    },
    contactsIcon: {
      minWidth: 'unset',
      width: 32,
      height: 32,
      border: 0,
      borderRadius: '50%',
    },
    pastTalks: {
      opacity: 0.5,
    },
    avatarSkeleton: {
      height: 80,
      borderRadius: '50%',
    },
  };
};
