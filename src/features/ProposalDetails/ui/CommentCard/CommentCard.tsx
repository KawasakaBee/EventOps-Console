import { Avatar, Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { ICommentCardProps } from './CommentCard.types';
import { formatIsoDateTime } from '@/shared/utils/formatTimeAndDate';
import { styles } from './styles';
import getAvatarInitials from '../../model/getAvatarInitials';
import { rolesDictionary } from '@/entities/user/model/dictionaries';
import { UserListItem } from '@/entities/user/model/types';
import { Comment } from '@/entities/comment/model/types';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';

const CommentCard: React.FC<ICommentCardProps> = ({
  comment,
  users,
  isUsersError,
  usersError,
}) => {
  const sx = styles({ role: comment.actorRole });

  const user = (comment: Comment, users: UserListItem[]) => {
    const foundUser = users.find((u) => u.id === comment.actorId);
    return foundUser ?? { name: 'Данные автора недоступны' };
  };

  return (
    <Grid container columnSpacing={2}>
      <Grid size="auto">
        <Avatar sx={sx.commentCardAvatar}>
          {isUsersError
            ? 'U'
            : users
              ? getAvatarInitials(user(comment, users.users).name)
              : 'U'}
        </Avatar>
      </Grid>
      <Grid size="grow">
        <Stack direction="row" spacing={1} sx={sx.commentCardBioWrap}>
          <Typography variant="body2" sx={sx.commentCardUserName}>
            {isUsersError
              ? getApiErrorMessage(usersError)
              : users
                ? user(comment, users.users).name
                : 'Не удалось загрузить пользователя'}
          </Typography>
          <Chip
            label={rolesDictionary[comment.actorRole]}
            sx={sx.commentCardUserRole}
          />
        </Stack>
        <Box sx={sx.commentCardTimeWrap}>
          <Typography variant="caption" sx={sx.commentCardTime}>
            {formatIsoDateTime(comment.createdAt)}
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
