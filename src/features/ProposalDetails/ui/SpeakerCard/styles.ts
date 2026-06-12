import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'speakerCard'
  | 'speakerCardHeadingWrap'
  | 'speakerCardNameWrap'
  | 'speakerCardInfoWrap'
  | 'speakerCardInfoEmailWrap'
  | 'speakerCardInfoEmail'
  | 'speakerCardContactsWrap'
  | 'speakerCardContactsIcon'
  | 'speakerCardPastTalks'
  | 'speakerCardAvatarSkeleton';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    speakerCard: {
      p: 2,
      border: '2px solid',
      borderColor: 'primary.main',
      borderRadius: 1.5,
    },
    speakerCardHeadingWrap: {
      justifyContent: 'space-between',
    },
    speakerCardNameWrap: {
      alignItems: 'center',
    },
    speakerCardInfoWrap: {
      p: 2,
      border: '1px dotted',
      borderColor: 'text.disabled',
      borderRadius: 1.5,
    },
    speakerCardInfoEmailWrap: {
      alignItems: 'center',
    },
    speakerCardInfoEmail: {
      border: 0,
    },
    speakerCardContactsWrap: {
      alignItems: 'center',
    },
    speakerCardContactsIcon: {
      minWidth: 'unset',
      width: 32,
      height: 32,
      border: 0,
      borderRadius: '50%',
    },
    speakerCardPastTalks: {
      opacity: 0.5,
    },
    speakerCardAvatarSkeleton: {
      height: 80,
      borderRadius: '50%',
    },
  };
};
