import { resetMockDb } from './scenarios/resetMockDb';

export const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') return;
  if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') return;

  const { worker } = await import('./browser');

  resetMockDb();

  await worker.start({ onUnhandledRequest: 'bypass' });
};
