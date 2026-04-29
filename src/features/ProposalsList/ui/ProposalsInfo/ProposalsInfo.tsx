import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Grid } from '@mui/material';
import { IProposalsInfoProps } from './ProposalsInfo.types';

const ProposalsInfo: React.FC<IProposalsInfoProps> = ({
  totalProposalsCount,
  selectedPage,
  selectedPageSize,
  filtersCount,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid size={3}>
        <SectionCard title="Всего заявок: ">{totalProposalsCount}</SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Страница: ">{selectedPage}</SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Заявок на странице: ">
          {selectedPageSize}
        </SectionCard>
      </Grid>
      <Grid size={3}>
        <SectionCard title="Активные фильтры: ">{filtersCount}</SectionCard>
      </Grid>
    </Grid>
  );
};

export default ProposalsInfo;
