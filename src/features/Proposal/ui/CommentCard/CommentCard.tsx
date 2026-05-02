import { Box, Stack, Typography } from '@mui/material';
import { ICommentCardProps } from './CommentCard.types';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import { rolesDictionary } from '@/shared/data';
import { styles } from './styles';

const CommentCard: React.FC<ICommentCardProps> = ({ comment, user }) => {
  const sx = styles();

  return (
    <Stack>
      <Stack direction="row" spacing={1}>
        <Typography variant="body2" sx={sx.userName}>
          {user ? user.name : 'Пользователь'}
        </Typography>
        <Typography variant="body2">
          ({rolesDictionary[comment.actorRole]})
        </Typography>
      </Stack>
      <Box sx={sx.commentWrapper}>
        <Typography variant="body2" sx={sx.commentTime}>
          {isoToLocalDate(comment.createdAt)}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2">{comment.message}</Typography>
      </Box>
    </Stack>
  );
};

export default CommentCard;
