import {
  Avatar,
  Box,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { ICommentCardProps } from './CommentCard.types';
import formatIsoDateTime from '@/shared/utils/formatIsoDateTime';
import { styles } from './styles';
import getAvatarInitials from '../../model/getAvatarInitials';
import { rolesDictionary } from '@/entities/user/model/dictionaries';

const CommentCard: React.FC<ICommentCardProps> = ({ comment, user }) => {
  const sx = styles({ role: comment.actorRole });

  const isDataLoaded = user.status === 'success' || user.status === 'error';
  const isError = user.status === 'error';

  return (
    <Grid container columnSpacing={2}>
      <Grid size="auto">
        {isDataLoaded ? (
          <Avatar sx={sx.avatar}>
            {isError ? 'U' : getAvatarInitials(user.data.name)}
          </Avatar>
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}
      </Grid>
      <Grid size="grow">
        <Stack direction="row" spacing={1} sx={sx.bioWrapper}>
          {isDataLoaded ? (
            <Typography variant="body2" sx={sx.userName}>
              {isError ? user.message : user.data.name}
            </Typography>
          ) : (
            <Skeleton variant="text" width={200} />
          )}

          <Chip label={rolesDictionary[comment.actorRole]} sx={sx.userRole} />
        </Stack>
        <Box sx={sx.timeWrapper}>
          <Typography variant="caption" sx={sx.commentTime}>
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
