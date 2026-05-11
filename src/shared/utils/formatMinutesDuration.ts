const formatMinutesDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours === 0) return `${minutes} мин`;

  if (minutes === 0) return `${hours} ч`;

  return `${hours} ч ${minutes} мин`;
};

export default formatMinutesDuration;
