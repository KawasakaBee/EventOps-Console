import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLogoutMutation } from '../api/appBarApi';
import getAppBarErrorState from './getAppBarErrorState';
import { useAppDispatch } from '@/shared/store/hooks';
import { baseApi } from '@/shared/api/baseApi';

const useAppBarData = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errorProps, setErrorProps] = useState<ErrorStateProps | null>(null);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const logoutData = await logout();

    if (logoutData.error) {
      setErrorProps(
        getAppBarErrorState({ onClose: () => setErrorProps(null) }),
      );
      return;
    }

    dispatch(baseApi.util.resetApiState());

    router.replace('/login');
    router.refresh();
  };

  return { errorProps, handleLogout };
};

export default useAppBarData;
