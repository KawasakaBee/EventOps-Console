import {
  Box,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { IProposalOverviewTabProps } from './ProposalOverviewTab.types';
import formatMinutesDuration from '@/shared/utils/formatMinutesDuration';
import { formatIsoDateTime } from '@/shared/utils/formatTimeAndDate';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { styles } from './styles';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import {
  formatDictionary,
  levelDictionary,
} from '@/entities/proposal/model/dictionaries';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';
import { Proposal } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import { useMemo } from 'react';

const ProposalOverviewTab: React.FC<IProposalOverviewTabProps> = ({
  proposal,
}) => {
  const sx = styles();

  const { data, isLoading, isError, error } = useGetTracksQuery();
  const events = useGetEventsQuery();

  const track = (proposalData: Proposal, tracks: Track[]) => {
    const foundTrack = tracks.find(
      (track) => track.id === proposalData.trackId,
    );
    return (
      foundTrack ?? {
        title: 'Трек не найден',
      }
    );
  };

  const currentEvent = useMemo(
    () => events.data?.events.find((event) => event.id === proposal?.eventId),
    [events.data, proposal?.eventId],
  );

  return proposal ? (
    <Stack spacing={6}>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid size={12}>
          <Typography variant="h2" sx={sx.overviewTitle}>
            {proposal.title}
          </Typography>
        </Grid>
        <Grid size={12} sx={sx.overviewHead}>
          <Stack
            direction="row"
            spacing={2}
            sx={sx.overviewList}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <StatusChip
              type="outlined"
              status={proposal.status}
              shape="rounded"
              size="small"
            />
            {isLoading ? (
              <Skeleton variant="text" width={200} />
            ) : (
              <Typography>
                Трек:{' '}
                {isError
                  ? getApiErrorMessage(error)
                  : data
                    ? track(proposal, data.tracks).title
                    : 'Не удалось загрузить трек'}
              </Typography>
            )}
            <Typography>
              Продолжительность:
              {formatMinutesDuration(proposal.duration)}
            </Typography>
          </Stack>
        </Grid>
        <Grid container columnSpacing={0} sx={sx.contentContainer}>
          <Grid size={8} sx={sx.abstractWrapper}>
            <Stack spacing={6}>
              <Box>
                <Typography variant="h3">Описание</Typography>
                <Divider sx={sx.abstractDivider} />
                <Typography variant="body1">{proposal.abstract}</Typography>
              </Box>
              <Box>
                <Typography variant="h3">Целевая аудитория</Typography>
                <Divider sx={sx.abstractDivider} />
                <Typography variant="body1">
                  {proposal.targetAudience}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3">Требования</Typography>
                <Divider sx={sx.abstractDivider} />
                <Typography variant="body1">
                  {proposal.prerequisites}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3">Ключевые выводы</Typography>
                <Divider sx={sx.abstractDivider} />
                <Typography variant="body1">{proposal.takeaways}</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid container size={4} rowSpacing={4} sx={sx.metadataContainer}>
            <Grid size={12}>
              <Box>
                <Typography variant="h3">Метаданные</Typography>
                <Divider sx={sx.abstractDivider} />
              </Box>
              <Stack spacing={1}>
                <Typography variant="h3">Событие: </Typography>
                {events.isLoading ? (
                  <Skeleton variant="text" width={200} />
                ) : events.isError ? (
                  <Typography>{getApiErrorMessage(events.error)}</Typography>
                ) : currentEvent ? (
                  <>
                    <Typography variant="body2">
                      {currentEvent.title}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2">Нет событий</Typography>
                )}
              </Stack>
              <Stack spacing={1}>
                <Typography variant="h3">Формат: </Typography>
                <Typography variant="body2">
                  {formatDictionary[proposal.format]}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack spacing={1}>
                <Typography variant="h3">Уровень: </Typography>
                <Typography variant="body2">
                  {levelDictionary[proposal.level]}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack spacing={1}>
                <Typography variant="h3">Теги:</Typography>
                {proposal.tags.length !== 0 ? (
                  <Grid container size={12} spacing={1}>
                    {proposal.tags.map((tag) => (
                      <Grid key={tag}>
                        <Chip label={tag} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Grid size={12}>Тегов нет</Grid>
                )}
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack spacing={1}>
                <Typography variant="h3">Дата создания: </Typography>
                <Typography variant="body2">
                  {formatIsoDateTime(proposal.createdAt)}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack spacing={1}>
                <Typography variant="h3">
                  Дата последнего изменения:{' '}
                </Typography>
                <Typography variant="body2">
                  {formatIsoDateTime(proposal.updatedAt)}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  ) : (
    <EmptyState
      title="Заявка не найдена"
      subtitle="Попробуйте перезагрузить страницу или использовать правильный ID заявки."
    />
  );
};

export default ProposalOverviewTab;
