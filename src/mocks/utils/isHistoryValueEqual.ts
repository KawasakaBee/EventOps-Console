const isHistoryValueEqual = (prev: unknown, next: unknown): boolean => {
  if (Array.isArray(prev) || Array.isArray(next)) {
    if (!Array.isArray(prev) || !Array.isArray(next)) return false;
    if (prev.length !== next.length) return false;

    return prev.every((value, idx) => value === next[idx]);
  }

  if (prev === null || next === null) {
    return prev === next;
  }

  if (typeof prev === 'object' || typeof next === 'object') {
    if (typeof prev !== 'object' || typeof next !== 'object') return false;

    return JSON.stringify(prev) === JSON.stringify(next);
  }

  return Object.is(prev, next);
};

export default isHistoryValueEqual;
