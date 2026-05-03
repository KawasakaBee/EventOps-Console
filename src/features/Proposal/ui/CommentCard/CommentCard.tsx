import { Avatar, Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { ICommentCardProps } from './CommentCard.types';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import { rolesDictionary } from '@/shared/data';
import { styles } from './styles';
import getAvatarInitials from '../../model/getAvatarInitials';
import { useMemo } from 'react';

const CommentCard: React.FC<ICommentCardProps> = ({ comment, user }) => {
  const sx = styles({ role: comment.actorRole });

  const avatarInitials = useMemo(
    () => (user?.name ? getAvatarInitials(user.name) : 'U'),
    [user],
  );

  return (
    <Grid container columnSpacing={2}>
      <Grid size="auto">
        <Avatar sx={sx.avatar}>{avatarInitials}</Avatar>
      </Grid>
      <Grid size="grow">
        <Stack direction="row" spacing={1} sx={sx.bioWrapper}>
          <Typography variant="body2" sx={sx.userName}>
            {user ? user.name : 'Пользователь'}
          </Typography>
          <Chip label={rolesDictionary[comment.actorRole]} sx={sx.userRole} />
        </Stack>
        <Box sx={sx.timeWrapper}>
          <Typography variant="caption" sx={sx.commentTime}>
            {isoToLocalDate(comment.createdAt)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">{comment.message}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CommentCard;
