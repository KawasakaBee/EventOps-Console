import { DashboardRange, dashboardRanges } from './types';

export const isDashboardRange = (value: unknown): value is DashboardRange =>
  typeof value === 'string' && dashboardRanges.some((range) => range === value);
