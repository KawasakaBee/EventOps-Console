import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  useMediaQuery,
} from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isSortBy, isSortOrder } from '@/shared/utils/typeGuards';
import { SortBy } from '@/shared/types/primitives.types';
import { styles } from './styles';
import { IProposalsTableProps } from './ProposalsTable.types';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setSelectedIds } from '../../model/proposalsListSlice';
import { useMemo } from 'react';
import ProposalsTableRow from '../ProposalsTableRow/ProposalsTableRow';
import {
  proposalListItemDictionary,
  proposalListItemKeys,
  proposalTableWidthDictionary,
} from '../../model/tableColumns';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import { theme } from '@/shared/theme/theme';
import useResizeWindow from '@/shared/utils/hooks/useResizeWindow';

const ProposalsTable: React.FC<IProposalsTableProps> = ({
  proposals,
  role,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(
    (store) => store.proposalsFilters.selectedIds,
  );

  const { data, isLoading, isError, error } = useGetTracksQuery();
  const events = useGetEventsQuery();

  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const viewportWidth = useResizeWindow();

  const untypedSortBy = searchParams.get('sortBy');
  const untypedSortOrder = searchParams.get('sortOrder');
  const sortBy =
    untypedSortBy && isSortBy(untypedSortBy) ? untypedSortBy : null;
  const sortOrder =
    untypedSortOrder && isSortOrder(untypedSortOrder)
      ? untypedSortOrder
      : 'asc';

  const selectedIdsSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const allVisibleSelected = useMemo(
    () => proposals.every((proposal) => selectedIdsSet.has(proposal.id)),
    [proposals, selectedIdsSet],
  );
  const someVisibleSelected = useMemo(
    () => proposals.some((proposal) => selectedIdsSet.has(proposal.id)),
    [proposals, selectedIdsSet],
  );

  const sx = useMemo(() => styles({ viewportWidth }), [viewportWidth]);

  const columnsWidth = useMemo(
    () => proposalTableWidthDictionary({ isDesktop, isLaptop, viewportWidth }),
    [isDesktop, isLaptop, viewportWidth],
  );

  const handleSort = (by: SortBy | 'actions' | 'availableStatuses') => {
    if (by === 'actions' || by === 'availableStatuses') return;

    const params = new URLSearchParams(searchParams.toString());

    const isSameColumn = sortBy === by;
    const nextSortOrder = isSameColumn
      ? sortOrder === 'asc'
        ? 'desc'
        : 'asc'
      : 'desc';

    params.set('sortBy', by);
    params.set('sortOrder', nextSortOrder);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleToggleSelectAllProposals = (
    event: React.ChangeEvent<HTMLInputElement, Element>,
  ) => {
    const checked = event.target.checked;

    dispatch(
      setSelectedIds(checked ? proposals.map((proposal) => proposal.id) : []),
    );
  };

  return (
    <TableContainer component={Paper} sx={sx.proposalsTable}>
      <Table>
        <colgroup>
          {Object.entries(columnsWidth).map(([key, value]) => (
            <col key={key} style={{ width: value.width }} />
          ))}
        </colgroup>

        <TableHead>
          <TableRow>
            {proposalListItemKeys.map((key) => {
              if (key === 'availableStatuses') return null;

              return (
                <TableCell
                  sortDirection={sortBy === key ? sortOrder : false}
                  key={`Table-head-cell-${key}`}
                >
                  {key === 'checkbox' && (
                    <Checkbox
                      sx={sx.proposalsTableCheckbox}
                      checked={allVisibleSelected}
                      indeterminate={someVisibleSelected && !allVisibleSelected}
                      onChange={(event) =>
                        handleToggleSelectAllProposals(event)
                      }
                    />
                  )}
                  {key === 'actions' || key === 'checkbox' ? (
                    proposalListItemDictionary[key]
                  ) : (
                    <TableSortLabel
                      active={sortBy === key}
                      direction={sortBy === key ? sortOrder : 'asc'}
                      sx={sx.proposalsTableSortLabel}
                      onClick={() => handleSort(key)}
                    >
                      {proposalListItemDictionary[key]}
                    </TableSortLabel>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {proposals.map((proposal) => (
            <ProposalsTableRow
              key={`Table-body-row-${proposal.id}`}
              proposal={proposal}
              sx={sx.proposalsTableCheckbox}
              isSelected={selectedIdsSet.has(proposal.id)}
              role={role}
              tracks={data}
              isTracksLoading={isLoading}
              isTracksError={isError}
              tracksError={error}
              events={events.data}
              isEventsLoading={events.isLoading}
              isEventsError={events.isError}
              eventsError={events.error}
              columnsWidth={columnsWidth}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProposalsTable;
