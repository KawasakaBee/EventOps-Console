import { Box, Stack } from '@mui/material';
import { IProposalCommentsTabProps } from './ProposalCommentsTab.types';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import CommentCard from '../CommentCard/CommentCard';
import CommentCardSkeleton from '../CommentCard/CommentCardSkeleton';
import { Comment } from '@/entities/comment/model/types';
import { UserListItem } from '@/entities/user/model/types';

const ProposalCommentsTab: React.FC<IProposalCommentsTabProps> = ({
  comments,
  canAddComment,
  users,
}) => {
  const isDataLoaded = users.status === 'success' || users.status === 'error';
  const isError = users.status === 'error';

  const user = (comment: Comment, users: UserListItem[]) => {
    const foundUser = users.find((u) => u.id === comment.actorId);
    return foundUser ?? { id: '', name: 'Данные автора недоступны' };
  };

  return (
    <Box>
      {comments.length !== 0 ? (
        <Stack spacing={10}>
          {comments.map((comment) => {
            return isDataLoaded ? (
              isError ? (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  user={{ status: users.status, message: users.message }}
                />
              ) : (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  user={{
                    status: users.status,
                    data: user(comment, users.data),
                  }}
                />
              )
            ) : (
              <CommentCardSkeleton key={comment.id} />
            );
          })}
        </Stack>
      ) : (
        <EmptyState
          title="Комментариев пока что нет"
          subtitle={`Пока что никто не оставлял комментарий для этой заявки.${canAddComment ? ' Добавьте комментарий.' : ''}`}
        />
      )}
    </Box>
  );
};

export default ProposalCommentsTab;
