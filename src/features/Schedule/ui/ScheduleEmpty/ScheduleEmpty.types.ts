export interface IScheduleEmptyProps {
  time: {
    from: string;
    to: string;
  };
  trackIdx: number;
  dayStart: string;
}

export interface IScheduleEmptySkeletonProps {
  trackIdx: number;
  lineIdx: number;
}
