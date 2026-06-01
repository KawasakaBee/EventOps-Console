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
import { styles } from './styles';
import {
  auditListItemDictionary,
  auditListItemKeys,
  auditTableWidthDictionary,
} from '../../model/tableColumns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isAuditSortBy } from '@/entities/audit/model/typeGuards';
import { isSortOrder } from '@/shared/utils/typeGuards';
import { AuditSortBy } from '@/shared/types/primitives.types';
import { IAuditTableProps } from './AuditTable.types';
import AuditTableRow from '../AuditTableRow/AuditTableRow';
import { useGetCommentsQuery } from '@/entities/comment/api/commentApi';
import { useGetReviewersQuery } from '@/entities/reviewer/api/reviewerApi';
import { useGetUsersQuery } from '@/entities/user/api/userApi';

const AuditTable: React.FC<IAuditTableProps> = ({ audit }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();

  const users = useGetUsersQuery();
  const comments = useGetCommentsQuery();
  const reviewers = useGetReviewersQuery();

  const untypedSortBy = searchParams.get('sortBy');
  const untypedSortOrder = searchParams.get('sortOrder');
  const sortBy =
    untypedSortBy && isAuditSortBy(untypedSortBy) ? untypedSortBy : null;
  const sortOrder =
    untypedSortOrder && isSortOrder(untypedSortOrder)
      ? untypedSortOrder
      : 'asc';

  const sx = styles();

  const handleSort = (by: AuditSortBy) => {
    const params = new URLSearchParams(stringifySearchParams);

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
          {Object.entries(auditTableWidthDictionary).map(([key, value]) => (
            <col key={key} style={{ width: value.width }} />
          ))}
        </colgroup>

        <TableHead>
          <TableRow>
            {auditListItemKeys.map((key) => (
              <TableCell
                sortDirection={sortBy === key ? sortOrder : false}
                key={`Table-head-cell-${key}`}
              >
                {key === 'payload' ? (
                  auditListItemDictionary[key]
                ) : (
                  <TableSortLabel
                    active={sortBy === key}
                    direction={sortBy === key ? sortOrder : 'asc'}
                    sx={sx.tableSortLabel}
                    onClick={() => handleSort(key)}
                  >
                    {auditListItemDictionary[key]}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {audit.map((item) => (
            <AuditTableRow
              key={`Table-body-row-${item.id}`}
              auditItem={item}
              users={users.data}
              isUsersLoading={users.isLoading}
              isUsersError={users.isError}
              usersError={users.error}
              reviewers={reviewers.data}
              isReviewersLoading={reviewers.isLoading}
              isReviewersError={reviewers.isError}
              comments={comments.data}
              isCommentsLoading={comments.isLoading}
              isCommentsError={comments.isError}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditTable;
