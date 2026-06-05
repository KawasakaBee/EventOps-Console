export type AssignmentError =
  | 'PROPOSAL_NOT_FOUND'
  | 'INVALID_STATUS'
  | 'TRACK_NOT_FOUND'
  | 'TRACK_MISMATCH'
  | 'INVALID_DAY'
  | 'INVALID_DURATION'
  | 'INVALID_INTERVAL'
  | 'TIME_CONFLICT'
  | 'SPEAKERS_NOT_FOUND'
  | 'SPEAKER_CONFLICT';

const scheduleAssignErrorParse = (error: AssignmentError): string => {
  switch (error) {
    case 'PROPOSAL_NOT_FOUND':
      return 'Заявка не найдена';
    case 'INVALID_STATUS':
      return 'Заявка должна быть в статусе "Принята"';
    case 'TRACK_NOT_FOUND':
      return 'Трек не найден';
    case 'TRACK_MISMATCH':
      return 'Трек слота и назначаемой заявки должны совпадать';
    case 'INVALID_DAY':
      return 'Неверный день мероприятия';
    case 'INVALID_DURATION':
      return 'Продолжительность не совпадает с выбранным временем';
    case 'INVALID_INTERVAL':
      return 'Неверный интервал времени слота';
    case 'TIME_CONFLICT':
      return 'Выбранный слот занят';
    case 'SPEAKERS_NOT_FOUND':
      return 'Спикеры не найдены';
    case 'SPEAKER_CONFLICT':
      return 'Спикеры данной заявки выступают в это время в другом треке';
    default:
      return 'Ошибка назначения';
  }
};

export default scheduleAssignErrorParse;
