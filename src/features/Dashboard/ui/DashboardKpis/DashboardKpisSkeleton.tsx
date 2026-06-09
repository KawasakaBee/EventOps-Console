import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Grid, Skeleton } from '@mui/material';

const DashboardKpisSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <SectionCard title="Всего отправлено заявок">
          <Skeleton variant="text" width={150} />
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Заявок в ревью">
          <Skeleton variant="text" width={150} />
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Принято заявок">
          <Skeleton variant="text" width={150} />
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Отклонено заявок">
          <Skeleton variant="text" width={150} />
        </SectionCard>
      </Grid>
    </Grid>
  );
};
export default DashboardKpisSkeleton;
