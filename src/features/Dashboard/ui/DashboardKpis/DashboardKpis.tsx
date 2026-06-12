import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Box, Grid, Typography } from '@mui/material';
import { IDashboardKpisProps } from './DashboardKpis.types';
import { styles } from './styles';
import { useRouter, useSearchParams } from 'next/navigation';
import { proposalStatuses } from '@/entities/proposal/model/types';

const DashboardKpis: React.FC<IDashboardKpisProps> = ({ dashboard }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serializedSearchParams = searchParams.toString();

  const sx = styles();

  const handleToTotalRedirect = () => {
    const params = new URLSearchParams(serializedSearchParams);

    params.delete('range');
    params.delete('status');
    proposalStatuses.forEach((status) => {
      if (status === 'draft') return;

      params.append('status', status);
    });

    router.push(`/proposals?${params.toString()}`);
  };

  const handleToInReviewRedirect = () => {
    const params = new URLSearchParams(serializedSearchParams);

    params.delete('range');
    params.set('status', 'in_review');

    router.push(`/proposals?${params.toString()}`);
  };

  const handleToAcceptedRedirect = () => {
    const params = new URLSearchParams(serializedSearchParams);

    params.delete('range');
    params.delete('status');
    params.append('status', 'accepted');
    params.append('status', 'scheduled');

    router.push(`/proposals?${params.toString()}`);
  };

  const handleToRejectedRedirect = () => {
    const params = new URLSearchParams(serializedSearchParams);

    params.delete('range');
    params.set('status', 'rejected');

    router.push(`/proposals?${params.toString()}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <Box sx={sx.dashboardKpisItemWrap} onClick={handleToTotalRedirect}>
          <SectionCard
            title="Всего отправлено заявок"
            restSx={sx.dashboardKpisCard}
          >
            <Typography variant="h4">
              {dashboard.kpis.totalSubmissions}
            </Typography>
            <Typography variant="caption">Кроме черновиков</Typography>
          </SectionCard>
        </Box>
      </Grid>
      <Grid size={3}>
        <Box sx={sx.dashboardKpisItemWrap} onClick={handleToInReviewRedirect}>
          <SectionCard title="Заявок в ревью" restSx={sx.dashboardKpisCard}>
            <Typography variant="h4">{dashboard.kpis.inReview}</Typography>
          </SectionCard>
        </Box>
      </Grid>
      <Grid size={3}>
        <Box sx={sx.dashboardKpisItemWrap} onClick={handleToAcceptedRedirect}>
          <SectionCard title="Принято заявок" restSx={sx.dashboardKpisCard}>
            <Typography variant="h4">{dashboard.kpis.accepted}</Typography>
            <Typography variant="caption">
              В статусе «Принята» и «В расписании»
            </Typography>
          </SectionCard>
        </Box>
      </Grid>
      <Grid size={3}>
        <Box sx={sx.dashboardKpisItemWrap} onClick={handleToRejectedRedirect}>
          <SectionCard title="Отклонено заявок" restSx={sx.dashboardKpisCard}>
            <Typography variant="h4">{dashboard.kpis.rejected}</Typography>
          </SectionCard>
        </Box>
      </Grid>
    </Grid>
  );
};
export default DashboardKpis;
