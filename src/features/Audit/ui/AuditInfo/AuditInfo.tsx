import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Grid } from '@mui/material';
import { IAuditInfoProps } from './AuditInfo.types';

const AuditInfo: React.FC<IAuditInfoProps> = ({
  totalAuditCount,
  selectedPage,
  selectedPageSize,
  filtersCount,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid size={3}>
        <SectionCard title="Всего действий: ">{totalAuditCount}</SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Страница: ">{selectedPage}</SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Действий на странице: ">
          {selectedPageSize}
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Активные фильтры: ">{filtersCount}</SectionCard>
      </Grid>
    </Grid>
  );
};

export default AuditInfo;
