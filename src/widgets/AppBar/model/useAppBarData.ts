import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLogoutMutation } from '../api/AppBarApi';
import getAppBarErrorState from './getAppBarErrorState';

const useAppBarData = () => {
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

    router.replace('/login');
    router.refresh();
  };

  return { errorProps, handleLogout };
};

export default useAppBarData;
