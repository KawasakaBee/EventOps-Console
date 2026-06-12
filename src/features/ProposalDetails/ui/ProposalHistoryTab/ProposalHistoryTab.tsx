import { Timeline } from '@mui/lab';
import { IProposalHistoryTabProps } from './ProposalHistoryTab.types';
import HistoryItem from '../HistoryItem/HistoryItem';
import { styles } from './styles';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import HistoryItemSkeleton from '../HistoryItem/HistoryItemSkeleton';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { useGetReviewersQuery } from '@/entities/reviewer/api/reviewerApi';
import { useGetUsersQuery } from '@/entities/user/api/userApi';

const ProposalHistoryTab: React.FC<IProposalHistoryTabProps> = ({
  history,
  comments,
}) => {
  const sx = styles();

  const users = useGetUsersQuery();
  const tracks = useGetTracksQuery();
  const reviewers = useGetReviewersQuery();

  return history.length !== 0 ? (
    <Timeline sx={sx.proposalHistoryTabTimeLine}>
      {history.map((item, idx) => {
        return users.isLoading || tracks.isLoading || reviewers.isLoading ? (
          <HistoryItemSkeleton key={item.id} />
        ) : (
          <HistoryItem
            key={item.id}
            item={item}
            isLastItem={idx === history.length - 1}
            users={users.data}
            isUsersError={users.isError}
            usersError={users.error}
            comments={comments}
            reviewers={reviewers.data}
            isReviewersError={reviewers.isError}
            tracks={tracks.data}
            isTracksError={tracks.isError}
          />
        );
      })}
    </Timeline>
  ) : (
    <EmptyState
      title="Истории пока что нет"
      subtitle="Для этой заявки пока что нет истории изменений"
    />
  );
};

export default ProposalHistoryTab;
