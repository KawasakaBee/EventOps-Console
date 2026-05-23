import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styles } from './styles';
import {
  myProposalListItemDictionary,
  myProposalListItemKeys,
  myProposalTableWidthDictionary,
} from '../../model/tableColumns';
import MyProposalsTableRowSkeleton from '../MyProposalsTableRow/MyProposalsTableRowSkeleton';

const MyProposalsTableSkeleton = () => {
  const sx = styles();

  return (
    <TableContainer component={Paper} sx={sx.table}>
      <Table>
        <colgroup>
          {Object.entries(myProposalTableWidthDictionary).map(
            ([key, value]) => (
              <col key={key} style={{ width: value.width }} />
            ),
          )}
        </colgroup>

        <TableHead>
          <TableRow>
            {myProposalListItemKeys.map((key) => {
              if (key === 'availableStatuses') return null;

              return (
                <TableCell sortDirection={'asc'} key={`Table-head-cell-${key}`}>
                  {myProposalListItemDictionary[key]}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 10 }).map((_, idx) => (
            <MyProposalsTableRowSkeleton key={idx} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default MyProposalsTableSkeleton;
