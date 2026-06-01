import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/store/hooks';
import { resetAuditFilters } from './auditSlice';
import { usePathname, useRouter } from 'next/navigation';

const useAuditData = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const auditFiltersReset = useCallback(() => {
    dispatch(resetAuditFilters());

    router.push(pathname);
  }, [dispatch, router, pathname]);

  // handlers

  return {
    auditFiltersReset,
  };
};

export default useAuditData;
