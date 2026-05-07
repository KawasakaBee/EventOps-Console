import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { IHistoryItemProps } from './HistoryItem.types';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import { historyActionsDictionary } from '@/shared/data';
import normalizeHistoryChanges from '@/shared/utils/normalizeHistoryChanges';
import { styles } from './styles';
import normalizeHistoryPayload from '@/shared/utils/normalizeHistoryPayload';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const HistoryItem: React.FC<IHistoryItemProps> = ({
  item,
  user,
  isLastItem,
  comments,
  reviewers,
}) => {
  const sx = styles();

  const isUserDataLoaded = user.status === 'success' || user.status === 'error';
  const isUserError = user.status === 'error';
  const isReviwersDataLoaded =
    reviewers.status === 'success' || reviewers.status === 'error';
  const isReviwersError = reviewers.status === 'error';

  const normalizedHistoryPayload = () => {
    if (!item.payload || !isReviwersDataLoaded) return null;

    const normalizePayload = normalizeHistoryPayload(
      item.payload,
      isReviwersError ? null : reviewers.data,
      comments,
    );
    if (!normalizePayload) return null;

    return (
      <Box>
        {normalizePayload.map((obj, idx) => (
          <Typography key={idx} variant="body2">
            {obj}
          </Typography>
        ))}
      </Box>
    );
  };

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        {!isLastItem && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Stack>
          <Typography variant="caption" sx={sx.itemTime}>
            {isoToLocalDate(item.createdAt)}
          </Typography>
          <Stack direction="row" spacing={2} sx={sx.itemChangesWrapper}>
            <Typography variant="subtitle1">
              <b>{historyActionsDictionary[item.action]}: </b>
            </Typography>
            {item.changes &&
              item.changes.map((act) => {
                const [prev, next] = normalizeHistoryChanges(act);
                return (
                  <Stack
                    key={act.field}
                    direction="row"
                    spacing={2}
                    sx={sx.itemChanges}
                  >
                    <Typography variant="subtitle2">{prev}</Typography>
                    <ArrowRightAltIcon />
                    <Typography variant="subtitle2">{next}</Typography>
                  </Stack>
                );
              })}
          </Stack>
          {normalizedHistoryPayload()}
          {isUserDataLoaded ? (
            <Typography variant="body1">
              by <i>{isUserError ? user.message : user.data.name}</i>
            </Typography>
          ) : (
            <Skeleton variant="text" width={150} />
          )}
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
};

export default HistoryItem;
