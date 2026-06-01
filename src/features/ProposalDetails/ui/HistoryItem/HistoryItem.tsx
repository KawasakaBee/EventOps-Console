import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { IHistoryItemProps } from './HistoryItem.types';
import { Box, Divider, Stack, Typography } from '@mui/material';
import formatIsoDateTime from '@/shared/utils/formatIsoDateTime';
import formatHistoryChangeValues from '@/entities/history/lib/formatHistoryChangeValues';
import { styles } from './styles';
import formatHistoryPayloadLines from '@/entities/history/lib/formatHistoryPayloadLines';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import { auditActionsDictionary } from '@/entities/audit/model/dictionaries';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';
import { HistoryEntry } from '@/entities/history/model/types';
import { UserListItem } from '@/entities/user/model/types';

const HistoryItem: React.FC<IHistoryItemProps> = ({
  item,
  users,
  isUsersError,
  usersError,
  isLastItem,
  comments,
  reviewers,
  isReviewersError,
  tracks,
  isTracksError,
}) => {
  const sx = styles();

  const user = (history: HistoryEntry, users: UserListItem[]) => {
    const foundUser = users.find((u) => u.id === history.actorId);
    return foundUser ?? { name: 'Данные автора недоступны' };
  };

  const normalizedHistoryPayload = () => {
    if (!item.payload) return null;

    const normalizePayload = formatHistoryPayloadLines(
      item.payload,
      isReviewersError ? null : (reviewers?.reviewers ?? null),
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
                    !isTracksError && tracks ? tracks.tracks : [],
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
          <Typography variant="body1">
            by{' '}
            <i>
              {isUsersError
                ? getApiErrorMessage(usersError)
                : users
                  ? user(item, users.users).name
                  : 'Пользователя не удалось загрузить'}
            </i>
          </Typography>
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
};

export default HistoryItem;
