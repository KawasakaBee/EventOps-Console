import {
  ByTrackItem,
  SubmissionsByStatusItem,
} from '@/entities/dashboard/model/types';

export interface IAnalyticsFunnelChartProps {
  byStatus: SubmissionsByStatusItem[];
  byTrack: ByTrackItem[];
}
