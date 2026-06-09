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
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { useGetEventsQuery } from '@/entities/event/api/eventApi';

const MyProposalsTable: React.FC<IMyProposalsTableProps> = ({
  proposalsList,
}) => {
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useGetTracksQuery();
  const events = useGetEventsQuery();

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
          {proposalsList.map((proposal) => (
            <MyProposalsTableRow
              key={`Table-body-row-${proposal.id}`}
              proposal={proposal}
              role={user.role}
              tracks={data}
              isTracksLoading={isLoading}
              isTracksError={isError}
              tracksError={error}
              events={events.data}
              isEventsLoading={events.isLoading}
              isEventsError={events.isError}
              eventsError={events.error}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default MyProposalsTable;
