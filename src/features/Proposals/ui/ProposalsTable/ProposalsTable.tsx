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
} from '@mui/material';

import {
  proposalListItemDictionary,
  proposalListItemKeys,
  proposalTableWidthDictionary,
} from '@/shared/data';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isSortBy, isSortOrder } from '@/shared/utils/typeGuards';
import { ID, SortBy } from '@/shared/types/primitives.types';
import { styles } from './styles';
import { IProposalsTableProps } from './ProposalsTable.types';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setSelectedIds } from '../../model/proposalsFiltersSlice';
import { useMemo } from 'react';
import ProposalsTableRow from '../ProposalsTableRow/ProposalsTableRow';

const ProposalsTable: React.FC<IProposalsTableProps> = ({
  proposals,
  tracks,
  role,
  setProposal,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(
    (store) => store.proposalsFilters.selectedIds,
  );

  const untypedSortBy = searchParams.get('sortBy');
  const untypedSortOrder = searchParams.get('sortOrder');
  const sortBy =
    untypedSortBy && isSortBy(untypedSortBy) ? untypedSortBy : null;
  const sortOrder =
    untypedSortOrder && isSortOrder(untypedSortOrder)
      ? untypedSortOrder
      : 'asc';

  const selectedIdsSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const tracksById: Map<ID, string> = useMemo(
    () => new Map(tracks.map((track) => [track.id, track.title])),
    [tracks],
  );

  const allVisibleSelected = useMemo(
    () => proposals.every((proposal) => selectedIdsSet.has(proposal.id)),
    [proposals, selectedIdsSet],
  );
  const someVisibleSelected = useMemo(
    () => proposals.some((proposal) => selectedIdsSet.has(proposal.id)),
    [proposals, selectedIdsSet],
  );

  const sx = useMemo(() => styles(), []);

  const handleSort = (by: SortBy | 'actions') => {
    if (by === 'actions') return;

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
    <TableContainer component={Paper} sx={sx.table}>
      <Table>
        <colgroup>
          {Object.entries(proposalTableWidthDictionary).map(([key, value]) => (
            <col key={key} style={{ width: value.width }} />
          ))}
        </colgroup>

        <TableHead>
          <TableRow>
            {proposalListItemKeys.map((key) => (
              <TableCell
                sortDirection={sortBy === key ? sortOrder : false}
                key={`Table-head-cell-${key}`}
              >
                {key === 'checkbox' && (
                  <Checkbox
                    sx={sx.tableCheckbox}
                    checked={allVisibleSelected}
                    indeterminate={someVisibleSelected && !allVisibleSelected}
                    onChange={(event) => handleToggleSelectAllProposals(event)}
                  />
                )}
                {key === 'actions' || key === 'checkbox' ? (
                  proposalListItemDictionary[key]
                ) : (
                  <TableSortLabel
                    active={sortBy === key}
                    direction={sortBy === key ? sortOrder : 'asc'}
                    sx={sx.tableSortLabel}
                    onClick={() => handleSort(key)}
                  >
                    {proposalListItemDictionary[key]}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {proposals.map((proposal) => (
            <ProposalsTableRow
              key={`Table-body-row-${proposal.id}`}
              proposal={proposal}
              sx={sx.tableCheckbox}
              isSelected={selectedIdsSet.has(proposal.id)}
              role={role}
              tracks={tracksById}
              setProposal={setProposal}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProposalsTable;
