import { ISODateString } from '../types/primitives.types';

const ruDateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const hourMinutes = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
});

export const formatIsoDateTime = (time: ISODateString) =>
  ruDateTimeFormatter.format(new Date(time));

export const addHourToIso = (iso: ISODateString): ISODateString => {
  const newTime = new Date(iso).getTime() + 60 * 60 * 1000;

  return new Date(newTime).toISOString() as ISODateString;
};

export const formatScheduleTime = (iso: ISODateString) =>
  hourMinutes.format(new Date(iso));
