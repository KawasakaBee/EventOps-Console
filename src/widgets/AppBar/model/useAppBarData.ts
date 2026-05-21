import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchLogout } from '../api/AppBarApi';

const useAppBarData = () => {
  const router = useRouter();
  const [errorProps, setErrorProps] = useState<ErrorStateProps | null>(null);

  const handleLogout = async () => {
    const logoutData = await fetchLogout(() => setErrorProps(null));

    if (logoutData.status === 'error') {
      setErrorProps(logoutData.errorProps);
      return;
    }

    router.replace('/login');
    router.refresh();
  };

  return { errorProps, handleLogout };
};

export default useAppBarData;
