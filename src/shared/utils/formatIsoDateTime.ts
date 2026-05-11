import { ISODateString } from '../types/primitives.types';

const ruDateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const formatIsoDateTime = (time: ISODateString) =>
  ruDateTimeFormatter.format(new Date(time));

export default formatIsoDateTime;
