import { PageStatus, Resource } from '../types/resource.types';

const toLoadableResource = <T>(
  status: PageStatus,
  data: T,
  errorMessage: string,
): Resource<T> => {
  if (status === 'success') {
    return { status: 'success', data };
  }

  if (status === 'error') {
    return { status: 'error', message: errorMessage };
  }

  return { status };
};

export default toLoadableResource;
