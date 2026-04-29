import {
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
  formatDictionary,
  levelDictionary,
  proposalListItemDictionary,
  proposalListItemKeys,
  proposalTableWidthDictionary,
} from '@/shared/data';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import RowActions from '../../../../components/RowActions/RowActions';
import getProposalListRowActions from '@/shared/utils/getProposalListRowActions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isSortBy, isSortOrder } from '@/shared/utils/typeGuards';
import { SortBy } from '@/shared/types/primitives.types';
import { styles } from './styles';
import { IProposalsTableProps, ITableRowProps } from './ProposalsTable.types';

const ProposalsTable: React.FC<IProposalsTableProps> = ({
  proposals,
  tracks,
  role,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const untypedSortBy = searchParams.get('sortBy');
  const untypedSortOrder = searchParams.get('sortOrder');
  const sortBy =
    untypedSortBy && isSortBy(untypedSortBy) ? untypedSortBy : null;
  const sortOrder =
    untypedSortOrder && isSortOrder(untypedSortOrder)
      ? untypedSortOrder
      : 'asc';

  const sx = styles();

  const renderCell = ({ rowName, data, tracksList }: ITableRowProps) => {
    switch (rowName) {
      case 'status':
        return (
          <StatusChip
            status={data[rowName]}
            shape="rounded"
            size="small"
            type="contained"
          />
        );
      case 'format':
        return formatDictionary.get(data.format);
      case 'level':
        return levelDictionary.get(data.level);
      case 'trackId': {
        const trackName = tracksList.find((track) => track.id === data.trackId);
        return trackName ? trackName.title : 'ID отсутствует';
      }
      case 'updatedAt':
        return isoToLocalDate(data.updatedAt);
      case 'actions':
        return;
      default:
        return data[rowName];
    }
  };

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
                <TableSortLabel
                  active={sortBy === key}
                  direction={sortBy === key ? sortOrder : 'asc'}
                  sx={sx.tableSortLabel}
                  onClick={() => handleSort(key)}
                >
                  {proposalListItemDictionary.get(key)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {proposals.map((proposal) => {
            return (
              <TableRow key={`Table-body-row-${proposal.id}`}>
                {proposalListItemKeys.map((key) =>
                  key === 'actions' ? (
                    <TableCell key="Table-body-cell-actions">
                      <RowActions
                        actions={getProposalListRowActions(
                          role,
                          proposal.status,
                        )}
                        proposalId={proposal.id}
                      />
                    </TableCell>
                  ) : (
                    <TableCell key={`Table-body-cell-${key}`}>
                      {renderCell({
                        rowName: key,
                        data: proposal,
                        tracksList: tracks,
                      })}
                    </TableCell>
                  ),
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProposalsTable;
