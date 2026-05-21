import getAppBarErrorState from '../model/getAppBarErrorState';
import { PostLogoutResponse } from '@/entities/user/api/contracts';
import { LogoutResource } from '../ui/AppBar.types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

export const fetchLogout = async (
  onClose: () => void,
): Promise<LogoutResource> => {
  const getErrorActions = {
    onClose,
  };

  const logoutData: LogoutResource = {
    status: 'loading',
    errorProps: null,
  };

  const response = await normalizeFetch<PostLogoutResponse>('/api/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    logoutData.errorProps = getAppBarErrorState(getErrorActions);
    logoutData.status = 'error';
    return logoutData;
  }

  logoutData.status = 'success';

  return logoutData;
};
