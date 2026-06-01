import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/shared/store/hooks';
import { resetFilters, resetSelectedIds } from './proposalsListSlice';
import { usePathname, useRouter } from 'next/navigation';
import { useGetProposalsPaginationQuery } from '../api/proposalsListApi';

const useProposalsListData = (searchParams: string) => {
  // State
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const pagination = useGetProposalsPaginationQuery(searchParams);

  const [multipleErrorsCount, setMultipleErrorsCount] = useState<number>(0);
  const [multipleAssignErrorsCount, setMultipleAssignErrorsCount] =
    useState<number>(0);

  //   handlers

  const handleFiltersReset = useCallback(() => {
    dispatch(resetFilters());

    router.push(pathname);
  }, [dispatch, pathname, router]);

  const handleMultipleStatusSuccess = (failedCount: number) => {
    dispatch(resetSelectedIds());
    if (failedCount > 0) {
      setMultipleErrorsCount(failedCount);
    }
  };

  const handleMultipleAssignReviewerSuccess = (failedCount: number) => {
    dispatch(resetSelectedIds());
    if (failedCount > 0) {
      setMultipleAssignErrorsCount(failedCount);
    }
  };

  const handleMultipleErrorsSnackbarClose = () => {
    setMultipleErrorsCount(0);
  };

  const handleMultipleAssignErrorsSnackbarClose = () => {
    setMultipleAssignErrorsCount(0);
  };

  return {
    pagination,
    multipleErrorsCount,
    multipleAssignErrorsCount,
    handleMultipleStatusSuccess,
    handleMultipleAssignReviewerSuccess,
    closeErrorSnackbar: handleMultipleErrorsSnackbarClose,
    closeAssignErrorSnackbar: handleMultipleAssignErrorsSnackbarClose,
    handleFiltersReset,
  };
};

export default useProposalsListData;
