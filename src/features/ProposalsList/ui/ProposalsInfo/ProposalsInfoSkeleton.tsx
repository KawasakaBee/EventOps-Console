import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Grid, Skeleton } from '@mui/material';

const ProposalsInfoSkeleton = () => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid size={3}>
        <SectionCard title="Всего заявок: ">
          <Skeleton variant="text" width={20} />
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Страница: ">
          <Skeleton variant="text" width={20} />
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Заявок на странице: ">
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

export default ProposalsInfoSkeleton;
