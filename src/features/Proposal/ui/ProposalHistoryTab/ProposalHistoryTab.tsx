import { Timeline } from '@mui/lab';
import { IProposalHistoryTabProps } from './ProposalHistoryTab.types';
import HistoryItem from '../HistoryItem/HistoryItem';
import { useMemo } from 'react';
import { styles } from './styles';

const ProposalHistoryTab: React.FC<IProposalHistoryTabProps> = ({
  history,
  users,
  comments,
  reviewers,
}) => {
  const sx = styles();

  const usersMapByHistoryId = useMemo(() => {
    if (!users) return;
    return new Map(
      history.map((item) => [
        item.id,
        users.find((user) => user.id === item.actorId),
      ]),
    );
  }, [history, users]);

  return (
    <Timeline sx={sx.timeline}>
      {history.map((item, idx) => {
        const user = usersMapByHistoryId?.get(item.id);
        return (
          <HistoryItem
            key={item.id}
            item={item}
            user={user ? user : null}
            isLastItem={idx === history.length - 1}
            comments={comments}
            reviewers={reviewers}
          />
        );
      })}
    </Timeline>
  );
};

export default ProposalHistoryTab;
