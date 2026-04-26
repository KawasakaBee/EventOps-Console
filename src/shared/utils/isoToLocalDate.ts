import { ISODateString } from '../types/primitives.types';

const isoToLocalDate = (time: ISODateString) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(time));

export default isoToLocalDate;
