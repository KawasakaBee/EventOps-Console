import { ScheduleQuery } from '../model/query';
import { Schedule } from '../model/types';
import getDayByQueryDate from './getDayByQueryDate';

export const parseScheduleQuery = (
  requestUrl: string,
  schedule: Schedule,
): ScheduleQuery => {
  const url = new URL(requestUrl, 'http://localhost');
  const date = url.searchParams.get('date');

  return {
    date: getDayByQueryDate(date, schedule),
  };
};
