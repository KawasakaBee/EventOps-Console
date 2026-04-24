'use client';

import { enableMocking } from '@/mocks';
import { useEffect, useState } from 'react';

const MswProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(
    process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled',
  );

  useEffect(() => {
    let isMounted = true;

    enableMocking().finally(() => {
      if (isMounted) setIsReady(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isReady) return null;

  return children;
};

export default MswProvider;
