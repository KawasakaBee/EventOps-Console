import {
  Paper,
  Skeleton,
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

const AuditTableSkeleton = () => {
  const sx = styles();

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
              <TableCell sortDirection="asc" key={`Table-head-cell-${key}`}>
                <TableSortLabel
                  active={true}
                  direction="asc"
                  sx={sx.tableSortLabel}
                  disabled={true}
                >
                  {auditListItemDictionary[key]}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 20 }).map((_, rowIdx) => {
            return (
              <TableRow key={rowIdx}>
                {auditListItemKeys.map((key) => (
                  <TableCell key={key}>
                    <Skeleton
                      variant="text"
                      width={auditTableWidthDictionary[key].skeletonWidth}
                    />
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditTableSkeleton;
