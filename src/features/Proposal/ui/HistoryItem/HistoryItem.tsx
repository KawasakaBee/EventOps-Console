import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { IHistoryItemProps } from './HistoryItem.types';
import { Stack, Typography } from '@mui/material';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import { historyActionsDictionary } from '@/shared/data';
import normalizeHistoryChanges from '@/shared/utils/normalizeHistoryChanges';
import { styles } from './styles';
import normalizeHistoryPayload from '@/shared/utils/normalizeHistoryPayload';

const HistoryItem: React.FC<IHistoryItemProps> = ({
  item,
  user,
  isLastItem,
  comments,
  reviewers,
}) => {
  const sx = styles();

  const normalizedHistoryPayload =
    item.payload && reviewers ? (
      <Typography variant="body2" sx={sx.itemPayload}>
        {normalizeHistoryPayload(item.payload, reviewers, comments)}
      </Typography>
    ) : null;

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        {!isLastItem && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Stack>
          <Typography variant="body2" sx={sx.itemTime}>
            {isoToLocalDate(item.createdAt)}
          </Typography>
          <Typography variant="body2">
            <b>{historyActionsDictionary[item.action]}</b>
            {item.changes &&
              item.changes.map((act) => normalizeHistoryChanges(act))}
          </Typography>
          {normalizedHistoryPayload}
          {user && (
            <Typography variant="body2">
              by <i>{user.name}</i>
            </Typography>
          )}
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
};

export default HistoryItem;
