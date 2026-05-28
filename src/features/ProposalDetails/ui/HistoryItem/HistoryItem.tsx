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
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import { auditActionsDictionary } from '@/entities/audit/model/dictionaries';

const HistoryItem: React.FC<IHistoryItemProps> = ({
  item,
  user,
  isLastItem,
  comments,
  reviewers,
  tracks,
}) => {
  const sx = styles();

  const isUserResourceLoaded =
    user.status === 'success' || user.status === 'error';
  const isUserError = user.status === 'error';
  const isReviewersDataLoaded =
    reviewers.status === 'success' || reviewers.status === 'error';
  const isReviewersError = reviewers.status === 'error';
  const isTracksSuccess = tracks.status === 'success';

  const normalizedHistoryPayload = () => {
    if (!item.payload || !isReviewersDataLoaded) return null;

    const normalizePayload = formatHistoryPayloadLines(
      item.payload,
      isReviewersError ? null : reviewers.data,
      comments,
    );
    if (!normalizePayload) return null;

    return (
      <Box>
        {normalizePayload.map((obj, idx) => (
          <Typography key={idx} variant="body2" sx={sx.payload}>
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
              <b>{auditActionsDictionary[item.action]}</b>
            </Typography>
            {item.changes && item.changes.length !== 0 && (
              <Stack
                spacing={1}
                divider={<Divider orientation="horizontal" flexItem />}
                sx={sx.timelineContentWrapper}
              >
                {item.changes.map((act) => {
                  const [prev, next] = formatHistoryChangeValues(
                    act,
                    isTracksSuccess ? tracks.data : [],
                  );
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
