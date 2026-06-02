import { Schedule } from '../model/types';

const getDayByQueryDate = (date: string | null, schedule: Schedule): string => {
  if (!date) return schedule.days[0].date;
  const foundDay = schedule.days.find((day) => day.date === date);
  return foundDay?.date ?? schedule.days[0].date;
};

export default getDayByQueryDate;
