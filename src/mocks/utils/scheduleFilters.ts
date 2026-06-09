import { ScheduleQuery } from '@/entities/schedule/model/query';
import { Schedule } from '@/entities/schedule/model/types';

export const applyScheduleFilters = (
  queryParams: ScheduleQuery,
  schedule: Schedule,
): Schedule => {
  const day = queryParams.date;
  if (!day || day === '') return schedule;
  return {
    ...schedule,
    times: schedule.times.filter((item) => item.time.slice(0, 10) === day),
    slots: schedule.slots.filter((slot) => slot.date === day),
  };
};
