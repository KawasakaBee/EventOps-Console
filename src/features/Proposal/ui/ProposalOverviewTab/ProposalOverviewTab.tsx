import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { IProposalOverviewTabProps } from './ProposalOverviewTab.types';
import {
  formatDictionary,
  levelDictionary,
  statusDictionary,
} from '@/shared/data';
import formatDuration from '@/shared/utils/formatDuration';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';

const ProposalOverviewTab: React.FC<IProposalOverviewTabProps> = ({
  proposal,
  track,
}) => {
  return (
    <Stack spacing={6}>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid size={2}>Статус</Grid>
        <Grid size={10}>{statusDictionary.get(proposal.status)}</Grid>
        <Grid size={2}>Формат</Grid>
        <Grid size={10}>{formatDictionary.get(proposal.format)}</Grid>
        <Grid size={2}>Уровень</Grid>
        <Grid size={10}>{levelDictionary.get(proposal.level)}</Grid>
        <Grid size={2}>Продолжительность</Grid>
        <Grid size={10}>{formatDuration(proposal.duration)}</Grid>
        <Grid size={2}>Трек</Grid>
        <Grid size={10}>{track ? track : '—'}</Grid>
        {proposal.tags.length !== 0 && <Grid size={2}>Теги</Grid>}
        {proposal.tags.length !== 0 && (
          <Grid container size={10} spacing={1}>
            {proposal.tags.map((tag) => (
              <Grid key={tag}>
                <Chip label={tag} />
              </Grid>
            ))}
          </Grid>
        )}
        <Grid size={2}>Дата создания</Grid>
        <Grid size={10}>{isoToLocalDate(proposal.createdAt)}</Grid>
        <Grid size={2}>Дата последнего изменения</Grid>
        <Grid size={10}>{isoToLocalDate(proposal.updatedAt)}</Grid>
      </Grid>
      <Box>
        <Typography variant="h2">{proposal.title}</Typography>
        <Typography variant="body2">{proposal.abstract}</Typography>
      </Box>
    </Stack>
  );
};

export default ProposalOverviewTab;
