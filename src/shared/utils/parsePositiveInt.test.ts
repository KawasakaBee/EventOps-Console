import { describe, expect, it } from 'vitest';
import parsePositiveInt from './parsePositiveInt';

describe('parsePositiveInt', () => {
  it('Входящее значение - число в строковом виде', () => {
    const value = '32';
    expect(parsePositiveInt(value, 1)).toBe(Number(value));
  });

  it('Входящее значение - не число', () => {
    const defaultValue = 1;
    expect(parsePositiveInt('string', defaultValue)).toBe(defaultValue);
    expect(parsePositiveInt(null, defaultValue)).toBe(defaultValue);
  });
});
