const parsePositiveInt = (
  value: string | null,
  defaultValue: number,
): number => {
  if (!value) return defaultValue;

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) return defaultValue;

  return parsedValue;
};

export default parsePositiveInt;
