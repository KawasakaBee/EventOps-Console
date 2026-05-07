import { Timeline } from '@mui/lab';
import { IProposalHistoryTabProps } from './ProposalHistoryTab.types';
import HistoryItem from '../HistoryItem/HistoryItem';
import { styles } from './styles';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import HistoryItemSkeleton from '../HistoryItem/HistoryItemSkeleton';
import { HistoryEntry } from '@/entities/history/model/types';
import { UserListItem } from '@/entities/user/model/types';

const ProposalHistoryTab: React.FC<IProposalHistoryTabProps> = ({
  history,
  users,
  comments,
  reviewers,
}) => {
  const sx = styles();

  const isUsersDataLoaded =
    users.status === 'success' || users.status === 'error';
  const isUsersError = users.status === 'error';

  const user = (history: HistoryEntry, users: UserListItem[]) => {
    const foundUser = users.find((u) => u.id === history.actorId);
    return foundUser ?? { id: '', name: 'Данные автора недоступны' };
  };

  return history.length !== 0 ? (
    <Timeline sx={sx.timeline}>
      {history.map((item, idx) => {
        return isUsersDataLoaded ? (
          isUsersError ? (
            <HistoryItem
              key={item.id}
              item={item}
              user={{ status: users.status, message: users.message }}
              isLastItem={idx === history.length - 1}
              comments={comments}
              reviewers={reviewers}
            />
          ) : (
            <HistoryItem
              key={item.id}
              item={item}
              user={{ status: users.status, data: user(item, users.data) }}
              isLastItem={idx === history.length - 1}
              comments={comments}
              reviewers={reviewers}
            />
          )
        ) : (
          <HistoryItemSkeleton key={item.id} />
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
