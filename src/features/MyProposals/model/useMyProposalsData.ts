import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { proposalStatuses } from '@/entities/proposal/model/types';
import { useGetMyProposalsQuery } from '../api/myProposalsApi';
import { MyProposalsTab } from './types';
import { isMyProposalsTab } from './typeGuards';

const useMyProposalsData = () => {
  // state
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const serializedSearchParams = searchParams.toString();

  const submittedSearchParams = useMemo(() => {
    const params = new URLSearchParams(serializedSearchParams);
    params.set('owner', 'me');
    params.delete('status');
    proposalStatuses.forEach((status) => {
      if (status === 'draft') return;

      params.append('status', status);
    });
    return params.toString();
  }, [serializedSearchParams]);

  const draftsSearchParams = useMemo(() => {
    const params = new URLSearchParams(serializedSearchParams);
    params.set('owner', 'me');
    params.set('status', 'draft');
    return params.toString();
  }, [serializedSearchParams]);

  const currentTab = useMemo(() => {
    const defaultTab: MyProposalsTab = 'proposals';

    if (!searchParams.has('tab')) return defaultTab;

    const tab = searchParams.get('tab');
    if (!isMyProposalsTab(tab)) return defaultTab;

    return tab;
  }, [searchParams]);

  const submittedPagination = useGetMyProposalsQuery(submittedSearchParams, {
    refetchOnMountOrArgChange: true,
  });
  const draftPagination = useGetMyProposalsQuery(draftsSearchParams, {
    refetchOnMountOrArgChange: true,
  });

  // handlers

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: string | number,
  ) => {
    if (!isMyProposalsTab(newValue)) return;

    const params = new URLSearchParams(serializedSearchParams);
    params.set('tab', newValue);
    params.set('page', '1');
    params.set('pageSize', '20');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleToSubmitRedirect = () => {
    router.push('/submit');
  };

  return {
    submittedPagination,
    draftPagination,
    currentTab,
    handleTabChange,
    handleToSubmitRedirect,
  };
};

export default useMyProposalsData;
