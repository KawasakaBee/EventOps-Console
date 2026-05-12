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
import formatIsoDateTime from '@/shared/utils/formatIsoDateTime';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { styles } from './styles';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import {
  formatDictionary,
  levelDictionary,
} from '@/entities/proposal/model/dictionaries';

const ProposalOverviewTab: React.FC<IProposalOverviewTabProps> = ({
  proposal,
  track,
}) => {
  const isDataLoaded = track.status === 'success' || track.status === 'error';
  const isError = track.status === 'error';

  const sx = styles();

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
            {isDataLoaded ? (
              <Typography>
                Трек: {isError ? track.message : track.data.title}
              </Typography>
            ) : (
              <Skeleton variant="text" width={200} />
            )}
            <Typography>
              Продолжительность: {formatMinutesDuration(proposal.duration)}
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
