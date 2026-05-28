import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Grid, Skeleton } from '@mui/material';

const AuditInfoSkeleton = () => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid size={3}>
        <SectionCard title="Всего действий: ">
          <Skeleton variant="text" width={20} />
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Страница: ">
          <Skeleton variant="text" width={20} />
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Действий на странице: ">
          <Skeleton variant="text" width={20} />
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Активные фильтры: ">
          <Skeleton variant="text" width={20} />
        </SectionCard>
      </Grid>
    </Grid>
  );
};

export default AuditInfoSkeleton;
