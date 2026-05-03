import { Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { IProposalOverviewTabProps } from './ProposalOverviewTab.types';
import { formatDictionary, levelDictionary } from '@/shared/data';
import formatDuration from '@/shared/utils/formatDuration';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { styles } from './styles';

const ProposalOverviewTab: React.FC<IProposalOverviewTabProps> = ({
  proposal,
  track,
}) => {
  const sx = styles();

  return (
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
            <Typography>Трек: {track ? track : '—'}</Typography>
            <Typography>
              Продолжительность: {formatDuration(proposal.duration)}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12} sx={sx.abstractWrapper}>
          <Typography variant="h3">Описание</Typography>
          <Typography variant="body2">{proposal.abstract}</Typography>
        </Grid>
        <Grid size={2}>Формат</Grid>
        <Grid size={10}>{formatDictionary.get(proposal.format)}</Grid>
        <Grid size={2}>Уровень</Grid>
        <Grid size={10}>{levelDictionary.get(proposal.level)}</Grid>
        <Grid size={2}>Теги</Grid>
        {proposal.tags.length !== 0 ? (
          <Grid container size={10} spacing={1}>
            {proposal.tags.map((tag) => (
              <Grid key={tag}>
                <Chip label={tag} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid size={10}>Тегов нет</Grid>
        )}
        <Grid size={2}>Дата создания</Grid>
        <Grid size={10}>{isoToLocalDate(proposal.createdAt)}</Grid>
        <Grid size={2}>Дата последнего изменения</Grid>
        <Grid size={10}>{isoToLocalDate(proposal.updatedAt)}</Grid>
      </Grid>
    </Stack>
  );
};

export default ProposalOverviewTab;
