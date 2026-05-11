import { ErrorCode, errorCodes, ErrorEnvelope } from '../types/api.types';
import { isObject } from '../utils/typeGuards';

const isStringRecord = (value: unknown): value is Record<string, string> =>
  isObject(value) &&
  Object.values(value).every((obj) => typeof obj === 'string');

const isErrorCode = (value: unknown): value is ErrorCode =>
  typeof value === 'string' && errorCodes.some((code) => code === value);

export const isErrorEnvelope = (value: unknown): value is ErrorEnvelope => {
  if (!isObject(value)) return false;
  if (!isObject(value.error)) return false;

  const { code, message, fields } = value.error;

  return (
    isErrorCode(code) &&
    typeof message === 'string' &&
    (fields === undefined || isStringRecord(fields))
  );
};
