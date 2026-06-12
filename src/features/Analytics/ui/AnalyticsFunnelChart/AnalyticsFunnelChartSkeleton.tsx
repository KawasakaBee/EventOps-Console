import { Box, CircularProgress, Grid } from '@mui/material';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { styles } from '../shared/styles';

const AnalyticsFunnelChartSkeleton = () => {
  const sx = styles();

  return (
    <Grid container columnSpacing={2}>
      <Grid size={6}>
        <SectionCard title="Распределение заявок по этапам review workflow">
          <Box sx={sx.chartLoader}>
            <CircularProgress />
          </Box>
        </SectionCard>
      </Grid>
      <Grid size={6}>
        <SectionCard title="Распределение заявок по трекам">
          <Box sx={sx.chartLoader}>
            <CircularProgress />
          </Box>
        </SectionCard>
      </Grid>
    </Grid>
  );
};
export default AnalyticsFunnelChartSkeleton;
