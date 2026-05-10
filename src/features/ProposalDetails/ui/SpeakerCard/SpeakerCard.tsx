import { Avatar, Stack, Typography } from '@mui/material';
import { ISpeakerCardProps } from './SpeakerCard.types';
import { styles } from './styles';
import { useState } from 'react';
import getAvatarInitials from '../../model/getAvatarInitials';
import TelegramIcon from '@mui/icons-material/Telegram';
import Button from '@/shared/ui/Button/Button';

const SpeakerCard: React.FC<ISpeakerCardProps> = ({ speaker }) => {
  const [isAvatarError, setIsAvatarError] = useState<boolean>(false);

  const sx = styles();

  return (
    <Stack spacing={4} sx={sx.cardWrapper}>
      <Stack direction="row" spacing={2} sx={sx.headingWrapper}>
        <Stack spacing={4}>
          <Stack direction="row" spacing={2} sx={sx.cardNameWrapper}>
            <Avatar
              src={isAvatarError ? undefined : speaker.avatarUrl}
              alt={speaker.name}
              slotProps={{
                img: {
                  onError: () => setIsAvatarError(true),
                  onLoad: () => setIsAvatarError(false),
                },
              }}
            >
              {getAvatarInitials(speaker.name)}
            </Avatar>
            <Typography variant="h2">{speaker.name}</Typography>
          </Stack>
          <Typography variant="caption">
            <i>
              {speaker.position} в {speaker.company}
            </i>
          </Typography>
        </Stack>
        <Stack spacing={1} sx={sx.cardInfoWrapper}>
          <Stack direction="row" spacing={1} sx={sx.cardInfoEmailWrapper}>
            <Typography variant="subtitle1">Email:</Typography>
            <Button
              mode="link"
              variant="outlined"
              size="small"
              to={`mailto:${speaker.email}`}
              isNewTab
              sx={sx.cardInfoEmail}
              isRelativeLink={false}
            >
              {speaker.email}
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} sx={sx.cardContactsWrapper}>
            <Typography variant="subtitle1">Контакты:</Typography>
            <Button
              mode="link"
              variant="outlined"
              size="small"
              to={speaker.contacts}
              isNewTab
              sx={sx.contactsIcon}
              isRelativeLink={false}
            >
              <TelegramIcon />
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Typography variant="body1">{speaker.bio}</Typography>
      <Typography variant="caption" sx={sx.pastTalks}>
        {speaker.pastTalks}
      </Typography>
    </Stack>
  );
};

export default SpeakerCard;
