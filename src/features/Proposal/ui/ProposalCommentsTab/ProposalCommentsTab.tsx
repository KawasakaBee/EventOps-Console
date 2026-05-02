import { Box, Stack } from '@mui/material';
import { IProposalCommentsTabProps } from './ProposalCommentsTab.types';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import CommentCard from '../CommentCard/CommentCard';
import { useMemo } from 'react';

const ProposalCommentsTab: React.FC<IProposalCommentsTabProps> = ({
  comments,
  canAddComment,
  users,
}) => {
  const usersMapByCommentId = useMemo(() => {
    if (!users) return;
    return new Map(
      comments.map((comment) => [
        comment.id,
        users.find((user) => user.id === comment.actorId),
      ]),
    );
  }, [users, comments]);

  return (
    <Box>
      {comments.length !== 0 ? (
        <Stack spacing={4}>
          {comments.map((comment) => {
            const user = usersMapByCommentId?.get(comment.id);
            return (
              <CommentCard
                key={comment.id}
                comment={comment}
                user={user ? user : null}
              />
            );
          })}
        </Stack>
      ) : (
        <EmptyState
          title="Комментариев пока что нет"
          subtitle={`Пока что никто не оставлял комментарий для этой заявки.${canAddComment ? ' Добавьте комментарий.' : ''}`}
          action={
            canAddComment
              ? {
                  handler: () => {},
                  buttonName: 'Добавить комментарий',
                }
              : undefined
          }
        />
      )}
    </Box>
  );
};

export default ProposalCommentsTab;
