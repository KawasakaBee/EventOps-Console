import { ErrorEnvelope } from '../types/api.types';

export const fallbackError: ErrorEnvelope['error'] = {
  code: 'NETWORK_ERROR',
  message: 'Не удалось выполнить запрос',
};
