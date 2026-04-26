import getCurrentUser from '../utils/getCurrentUser';

type FetchWithDemoAutoUserInit = RequestInit & {
  headers?: HeadersInit;
};

export const fetchWithDemoAuth = async (
  input: RequestInfo | URL,
  init: FetchWithDemoAutoUserInit = {},
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error('Нет авторизованного пользователя');

  const headers = new Headers(init.headers);

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  headers.set('x-demo-user-id', user.id);
  headers.set('x-demo-user-role', user.role);

  return fetch(input, {
    ...init,
    headers,
  });
};
