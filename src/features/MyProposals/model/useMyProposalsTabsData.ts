import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { MyProposalsTab } from './types';
import { isMyPropsalsTab } from './typeGuards';
import { PaginationResource } from '@/features/ProposalsList/model/types';

const useMyProposalsTabsData = (
  proposals: PaginationResource,
  drafts: PaginationResource,
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();

  const currentTab = useMemo(() => {
    const defaultTab: MyProposalsTab = 'proposals';

    if (!searchParams.has('tab')) return defaultTab;

    const tab = searchParams.get('tab');
    if (!isMyPropsalsTab(tab)) return defaultTab;

    return tab;
  }, [searchParams]);

  const isProposalsDataLoaded =
    proposals.status === 'success' || proposals.status === 'error';
  const isProposalsError = proposals.status === 'error';
  const isDraftsDataLoaded =
    drafts.status === 'success' || drafts.status === 'error';
  const isDraftsError = drafts.status === 'error';

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: string | number,
  ) => {
    if (!isMyPropsalsTab(newValue)) return;

    const params = new URLSearchParams(stringifySearchParams);
    params.set('tab', newValue);
    params.set('page', '1');
    params.set('pageSize', '20');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleToSubmitRedirect = () => {
    router.push('/submit');
  };

  return {
    currentTab,
    isProposalsDataLoaded,
    isProposalsError,
    isDraftsDataLoaded,
    isDraftsError,
    handleTabChange,
    handleToSubmitRedirect,
  };
};

export default useMyProposalsTabsData;
