import { Box, CircularProgress, Grid, useTheme } from '@mui/material';
import { IAnalyticsFunnelChartProps } from './AnalyticsFunnelChart.types';
import { useMemo } from 'react';
import { statusDictionary } from '@/entities/proposal/model/dictionaries';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { statusChipConfig } from '@/shared/ui/StatusChip/StatusChip.types';
import { styles } from '../shared/styles';

const AnalyticsFunnelChart: React.FC<IAnalyticsFunnelChartProps> = ({
  byStatus,
  byTrack,
}) => {
  const theme = useTheme();
  const tracks = useGetTracksQuery();

  const byStatusData = useMemo(
    () =>
      byStatus.map((item) => ({
        label: statusDictionary[item.status],
        count: item.count,
        fill: theme.palette[statusChipConfig[item.status].color].main,
      })),
    [byStatus, theme.palette],
  );

  const byTrackData = useMemo(() => {
    return byTrack.flatMap((item) => {
      if (!tracks.data) return [];
      const track = tracks.data.tracks.find(
        (track) => track.id === item.trackId,
      );
      return {
        label: track?.title ?? 'НЕ удалось определить название трека',
        count: item.count,
      };
    });
  }, [byTrack, tracks]);

  const sx = styles();

  return (
    <Grid container columnSpacing={2}>
      <Grid size={6}>
        <SectionCard title="Распределение заявок по этапам review workflow">
          <Box sx={sx.chartWrapper}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={byStatusData}
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
                  dataKey="label"
                  type="category"
                  width={100}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Bar
                  dataKey="count"
                  name="Заявки"
                  radius={[0, 8, 8, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </SectionCard>
      </Grid>
      <Grid size={6}>
        <SectionCard title="Распределение заявок по трекам">
          <Box sx={tracks.isLoading ? sx.chartLoader : sx.chartWrapper}>
            {tracks.isLoading ? (
              <CircularProgress />
            ) : tracks.isError ? (
              'Не удалось получить данные'
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={byTrackData}
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
                    dataKey="label"
                    type="category"
                    width={100}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    name="Заявки"
                    fill={theme.palette.primary.main}
                    radius={[0, 8, 8, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Box>
        </SectionCard>
      </Grid>
    </Grid>
  );
};
export default AnalyticsFunnelChart;
