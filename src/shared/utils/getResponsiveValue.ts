const getResponsiveValue = (
  fromValue: number,
  toValue: number,
  fromViewport: number,
  toViewport: number,
  currentViewport: number,
) => {
  if (fromViewport === toViewport) return fromValue;

  const progress = (currentViewport - toViewport) / (fromViewport - toViewport);
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return Math.round(toValue + (fromValue - toValue) * clampedProgress);
};

export default getResponsiveValue;
