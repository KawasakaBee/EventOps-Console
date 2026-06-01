import { Box, Stack } from '@mui/material';
import { IProposalCommentsTabProps } from './ProposalCommentsTab.types';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import CommentCard from '../CommentCard/CommentCard';
import CommentCardSkeleton from '../CommentCard/CommentCardSkeleton';
import { useGetUsersQuery } from '@/entities/user/api/userApi';

const ProposalCommentsTab: React.FC<IProposalCommentsTabProps> = ({
  comments,
  canAddComment,
}) => {
  const { data, isLoading, isError, error } = useGetUsersQuery();

  return (
    <Box>
      {comments.length !== 0 ? (
        <Stack spacing={10}>
          {comments.map((comment) => {
            return isLoading ? (
              <CommentCardSkeleton key={comment.id} />
            ) : (
              <CommentCard
                key={comment.id}
                comment={comment}
                users={data}
                isUsersError={isError}
                usersError={error}
              />
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
