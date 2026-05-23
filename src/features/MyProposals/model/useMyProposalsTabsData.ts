import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { MyProposalsTab } from './types';
import { isMyPropsalsTab } from './typeGuards';
import { PaginationResource } from '@/features/ProposalsList/model/types';
import parsePositiveInt from '@/shared/utils/parsePositiveInt';
import { PageSize } from '@/shared/types/primitives.types';
import { DEFAULT_PAGE_SIZE } from '@/shared/config/layout';
import { isPageSize } from '@/shared/utils/typeGuards';

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

  const selectedPage = useMemo(
    () => parsePositiveInt(searchParams.get('page'), 1),
    [searchParams],
  );
  const selectedPageSize = useMemo((): PageSize => {
    const queryPageSize = searchParams.get('pageSize');

    if (!queryPageSize) return DEFAULT_PAGE_SIZE;

    const parsedPageSize = Number(queryPageSize);

    if (!isPageSize(parsedPageSize)) return DEFAULT_PAGE_SIZE;

    return parsedPageSize;
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

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageSizeChange = (value: unknown) => {
    const pageSize = Number(value);

    if (!isPageSize(pageSize)) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set('pageSize', String(pageSize));
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleToSubmitRedirect = () => {
    router.push('/submit');
  };

  return {
    currentTab,
    selectedPage,
    selectedPageSize,
    isProposalsDataLoaded,
    isProposalsError,
    isDraftsDataLoaded,
    isDraftsError,
    handleTabChange,
    handlePageChange,
    handlePageSizeChange,
    handleToSubmitRedirect,
  };
};

export default useMyProposalsTabsData;
