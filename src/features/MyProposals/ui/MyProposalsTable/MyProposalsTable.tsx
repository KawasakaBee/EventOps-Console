import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
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
import useResizeWindow from '@/shared/utils/hooks/useResizeWindow';
import { theme } from '@/shared/theme/theme';
import { useMemo } from 'react';

const MyProposalsTable: React.FC<IMyProposalsTableProps> = ({
  proposalsList,
}) => {
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useGetTracksQuery();
  const events = useGetEventsQuery();

  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const viewportWidth = useResizeWindow();
  const sx = useMemo(() => styles({ viewportWidth }), [viewportWidth]);

  const columnsWidth = useMemo(
    () =>
      myProposalTableWidthDictionary({ isDesktop, isLaptop, viewportWidth }),
    [isDesktop, isLaptop, viewportWidth],
  );

  return (
    <TableContainer component={Paper} sx={sx.myProposalsTable}>
      <Table>
        <colgroup>
          {Object.entries(columnsWidth).map(([key, value]) => (
            <col key={key} style={{ width: value.width }} />
          ))}
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
              columnsWidth={columnsWidth}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default MyProposalsTable;
