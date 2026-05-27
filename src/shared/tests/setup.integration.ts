import '@testing-library/jest-dom/vitest';
import { resetMockDb } from '@/mocks/scenarios/resetMockDb';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mswServer';

beforeAll(() => {
  resetMockDb();

  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  server.resetHandlers();
  resetMockDb();
});

afterAll(() => {
  server.close();
});
