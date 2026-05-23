import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { IHistoryItemProps } from './HistoryItem.types';
import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';
import formatIsoDateTime from '@/shared/utils/formatIsoDateTime';
import formatHistoryChangeValues from '@/entities/history/lib/formatHistoryChangeValues';
import { styles } from './styles';
import formatHistoryPayloadLines from '@/entities/history/lib/formatHistoryPayloadLines';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { historyActionsDictionary } from '@/entities/history/model/dictionaries';
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';

const HistoryItem: React.FC<IHistoryItemProps> = ({
  item,
  user,
  isLastItem,
  comments,
  reviewers,
}) => {
  const sx = styles();

  const isUserResourceLoaded =
    user.status === 'success' || user.status === 'error';
  const isUserError = user.status === 'error';
  const isReviwersDataLoaded =
    reviewers.status === 'success' || reviewers.status === 'error';
  const isReviwersError = reviewers.status === 'error';

  const normalizedHistoryPayload = () => {
    if (!item.payload || !isReviwersDataLoaded) return null;

    const normalizePayload = formatHistoryPayloadLines(
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
      <TimelineContent sx={sx.timelineContent}>
        <Stack>
          <Typography variant="caption" sx={sx.itemTime}>
            {formatIsoDateTime(item.createdAt)}
          </Typography>
          <Stack direction="row" spacing={2} sx={sx.itemChangesWrapper}>
            <Typography variant="subtitle1">
              <b>{historyActionsDictionary[item.action]}</b>
            </Typography>
            {item.changes && item.changes.length !== 0 && (
              <Stack
                spacing={1}
                divider={<Divider orientation="horizontal" flexItem />}
                sx={sx.timelineContentWrapper}
              >
                {item.changes.map((act) => {
                  const [prev, next] = formatHistoryChangeValues(act);
                  return (
                    <Stack
                      key={act.field}
                      direction="row"
                      spacing={1}
                      sx={sx.itemChangesContainer}
                    >
                      <Stack sx={sx.timelineChanges}>
                        <Typography variant="caption">
                          <b>{proposalSubmitFieldsDictionary[act.field]}:</b>
                        </Typography>
                        <Stack direction="row" spacing={2} sx={sx.itemChanges}>
                          <Typography variant="subtitle2" sx={sx.changesPrev}>
                            {prev}
                          </Typography>
                          <ArrowRightAltIcon />
                          <Typography variant="subtitle2" sx={sx.changesNext}>
                            {next}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            )}
          </Stack>
          {normalizedHistoryPayload()}
          {isUserResourceLoaded ? (
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
