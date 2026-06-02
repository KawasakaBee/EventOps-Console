const toMs = (value: string) => new Date(value).getTime();

const getFreeIntervals = (
  time: { from: string; to: string },
  busySlots: { startTime: string; endTime: string }[],
) => {
  const baseFrom = toMs(time.from);
  const baseTo = toMs(time.to);

  let freeParts: Array<{ from: number; to: number }> = [
    { from: baseFrom, to: baseTo },
  ];

  for (const slot of busySlots) {
    const from = Math.max(toMs(slot.startTime), baseFrom);
    const to = Math.min(toMs(slot.endTime), baseTo);

    if (from >= to) continue;

    freeParts = freeParts.flatMap((freePart) => {
      const noOverlap = to <= freePart.from || from >= freePart.to;

      if (noOverlap) return [freePart];

      const result: Array<{ from: number; to: number }> = [];

      if (freePart.from < from) {
        result.push({
          from: freePart.from,
          to: from,
        });
      }

      if (to < freePart.to) {
        result.push({
          from: to,
          to: freePart.to,
        });
      }

      return result;
    });
  }

  return freeParts.map((part) => ({
    from: new Date(part.from).toISOString(),
    to: new Date(part.to).toISOString(),
  }));
};

export default getFreeIntervals;
