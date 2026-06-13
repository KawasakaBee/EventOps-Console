import { ErrorEnvelope } from '../types/api.types';

export const fallbackError: ErrorEnvelope['error'] = {
  code: 'UNKNOWN_ERROR',
  message: 'Не удалось выполнить запрос',
};
