import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IMyProposalsTableProps } from './MyProposalsTable.types';
import { styles } from './styles';
import {
  myProposalListItemDictionary,
  myProposalListItemKeys,
  myProposalTableWidthDictionary,
} from '../../model/tableColumns';
import { useAuth } from '@/entities/user/model/AuthProvider';
import MyProposalsTableRow from '../MyProposalsTableRow/MyProposalsTableRow';

const MyProposalsTable: React.FC<IMyProposalsTableProps> = ({
  data,
  tracks,
}) => {
  const { user } = useAuth();

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
          {data.map((proposal) => (
            <MyProposalsTableRow
              key={`Table-body-row-${proposal.id}`}
              proposal={proposal}
              role={user.role}
              tracks={tracks}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default MyProposalsTable;
