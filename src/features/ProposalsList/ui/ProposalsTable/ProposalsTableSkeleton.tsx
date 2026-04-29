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

import {
  proposalListItemDictionary,
  proposalListItemKeys,
  proposalTableWidthDictionary,
} from '@/shared/data';
import { styles } from './styles';

const ProposalsTableSkeleton = () => {
  const sx = styles();

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
              <TableCell sortDirection="asc" key={`Table-head-cell-${key}`}>
                <TableSortLabel
                  active={true}
                  direction="asc"
                  sx={sx.tableSortLabel}
                  disabled={true}
                >
                  {proposalListItemDictionary.get(key)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 20 }).map((_, rowIdx) => {
            return (
              <TableRow key={rowIdx}>
                {proposalListItemKeys.map((key) => (
                  <TableCell key={key}>
                    <Skeleton
                      variant="text"
                      width={proposalTableWidthDictionary[key].skeletonWidth}
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

export default ProposalsTableSkeleton;
