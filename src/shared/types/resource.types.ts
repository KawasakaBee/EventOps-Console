export const pageStatuses = ['idle', 'loading', 'success', 'error'] as const;

export type PageStatus = (typeof pageStatuses)[number];

export type Resource<T> =
  | { status: 'loading' | 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };
