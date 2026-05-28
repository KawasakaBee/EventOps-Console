import { parseAuditListQuery } from '@/entities/audit/lib/parseAuditListQuery';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  AuditFiltersState,
  hydrateAuditFilters,
  patchAuditFilters,
} from './auditSlice';
import { AuditAction, AuditEntity } from '@/entities/audit/model/types';
import {
  isAuditAction,
  isAuditEntity,
} from '@/entities/audit/model/typeGuards';
import { ID } from '@/shared/types/primitives.types';

const useAuditFilterBarData = (searchParams: string) => {
  // state

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useAppSelector((state) => state.auditFilters.draftFilters);

  // useEffect

  useEffect(() => {
    const { search, action, entity, actorId } = parseAuditListQuery(
      `${pathname}?${searchParams}`,
    );

    const filtersStoreBody: AuditFiltersState['draftFilters'] = {
      search,
      action,
      entity,
      actorId,
    };

    dispatch(hydrateAuditFilters(filtersStoreBody));
  }, [pathname, searchParams, dispatch]);

  // handlers

  const filterArrayQueryParams = <T extends string>(
    value: T[] | string,
    queryType: keyof AuditFiltersState['draftFilters'],
    queryTypeCheck: (value: unknown) => value is T,
  ) => {
    if (Array.isArray(value)) {
      dispatch(patchAuditFilters({ [queryType]: value }));
    } else {
      if (!queryTypeCheck(value)) return;
      dispatch(patchAuditFilters({ [queryType]: [value] }));
    }
  };

  const handleActionFilter = (value: AuditAction[] | string) => {
    filterArrayQueryParams(value, 'action', isAuditAction);
  };

  const handleEntityFilter = (value: AuditEntity[] | string) => {
    filterArrayQueryParams(value, 'entity', isAuditEntity);
  };

  const handleActorIdFilter = (id: ID | undefined) => {
    if (id) {
      dispatch(patchAuditFilters({ actorId: id }));
    } else {
      dispatch(patchAuditFilters({ actorId: null }));
    }
  };

  const setFilterParam = (
    queryType: keyof AuditFiltersState['draftFilters'],
    params: URLSearchParams,
  ) => {
    params.delete(queryType);
    if (queryType === 'action' || queryType === 'entity') {
      filters[queryType].forEach((val) => params.append(queryType, val));
    }
    if (
      (queryType === 'search' || queryType === 'actorId') &&
      filters[queryType]
    ) {
      params.set(queryType, filters[queryType]);
    }
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    setFilterParam('search', params);
    setFilterParam('action', params);
    setFilterParam('entity', params);
    setFilterParam('actorId', params);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    filters,
    handleActionFilter,
    handleEntityFilter,
    handleActorIdFilter,
    handleApplyFilters,
  };
};

export default useAuditFilterBarData;
