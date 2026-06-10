import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { styles } from './styles';
import { Box, CircularProgress } from '@mui/material';

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
