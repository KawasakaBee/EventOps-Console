import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  recentListItemDictionary,
  recentListItemKeys,
  recentTableWidthDictionary,
} from '../../model/tableColumns';

const DashboardRecentTableSkeleton = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {recentListItemKeys.map((key) => {
              if (key === 'availableStatuses') return null;

              return (
                <TableCell sortDirection="asc" key={`Table-head-cell-${key}`}>
                  {recentListItemDictionary[key]}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 20 }).map((_, rowIdx) => {
            return (
              <TableRow key={rowIdx}>
                {recentListItemKeys.map((key) => {
                  if (key === 'availableStatuses') return null;

                  return (
                    <TableCell key={key}>
                      <Skeleton
                        variant="text"
                        width={recentTableWidthDictionary[key].skeletonWidth}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardRecentTableSkeleton;
