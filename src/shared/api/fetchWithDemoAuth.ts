import { fallbackError } from '../config/errors';
import { ApiResult } from '../types/api.types';
import getCurrentUser from '../utils/getCurrentUser';

type FetchWithDemoAutoUserInit = RequestInit & {
  headers?: HeadersInit;
};

export const fetchWithDemoAuth = async (
  input: RequestInfo | URL,
  init: FetchWithDemoAutoUserInit = {},
): Promise<ApiResult<Response>> => {
  try {
    const user = await getCurrentUser();

    if (!user.ok) return user;

    const headers = new Headers(init.headers);

    if (init.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    headers.set('x-demo-user-id', user.data.id);
    headers.set('x-demo-user-role', user.data.role);

    const response = await fetch(input, {
      ...init,
      headers,
    });

    return {
      ok: true,
      data: response,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: fallbackError,
    };
  }
};
