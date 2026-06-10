import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { IAnalyticsReviewerWorkloadProps } from './AnalyticsReviewerWorkload.types';
import { styles } from './styles';
import { Box, useTheme } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMemo } from 'react';

const AnalyticsReviewerWorkload: React.FC<IAnalyticsReviewerWorkloadProps> = ({
  workflow,
}) => {
  const workflowData = useMemo(
    () =>
      workflow.map((item) => ({
        reviewer: item.reviewerName,
        completed: item.completedReviewsCount,
        pending: Math.max(item.assignedCount - item.completedReviewsCount, 0),
      })),
    [workflow],
  );

  const theme = useTheme();
  const sx = styles();

  return (
    <SectionCard title="Назначенные заявки и готовые ревью по ревьюерам">
      <Box sx={sx.chartWrapper}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={workflowData}
            layout="vertical"
            margin={{
              top: 8,
              right: 24,
              bottom: 8,
              left: 24,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" allowDecimals={false} />
            <YAxis
              dataKey="reviewer"
              type="category"
              width={160}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="completed"
              name="Готово"
              fill={theme.palette.success.main}
              radius={[0, 8, 8, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="pending"
              name="Ожидает"
              fill={theme.palette.warning.main}
              radius={[0, 8, 8, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </SectionCard>
  );
};
export default AnalyticsReviewerWorkload;
