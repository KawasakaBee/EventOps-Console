import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Box, CircularProgress } from '@mui/material';
import { styles } from '../shared/styles';

const AnalyticsReviewerWorkloadSkeleton = () => {
  const sx = styles();

  return (
    <SectionCard title="Назначенные заявки и готовые ревью по ревьюерам">
      <Box sx={sx.chartLoader}>
        <CircularProgress />
      </Box>
    </SectionCard>
  );
};
export default AnalyticsReviewerWorkloadSkeleton;
