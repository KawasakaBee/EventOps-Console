'use client';

import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import { useEffect } from 'react';

interface IAppErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const AppErrorPage: React.FC<IAppErrorPageProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      type="state"
      title="Что-то пошло не так"
      subtitle={'Произошла непредвиденная ошибка, попробуйте ещё раз'}
      action={{ buttonName: 'Попробовать ещё раз', handler: reset }}
      fullHeight
    />
  );
};

export default AppErrorPage;
