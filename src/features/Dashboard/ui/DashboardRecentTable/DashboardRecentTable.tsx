import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IDashboardRecentTableProps } from './DashboardRecentTable.types';
import {
  recentListItemDictionary,
  recentListItemKeys,
} from '../../model/tableColumns';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import DashboardTableRow from '../DashboardTableRow/DashboardTableRow';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';

const DashboardRecentTable: React.FC<IDashboardRecentTableProps> = ({
  dashboard,
}) => {
  const proposals = dashboard.recentSubmissions;

  const tracks = useGetTracksQuery();
  const events = useGetEventsQuery();

  return (
    <SectionCard title="Последние обновлённые заявки">
      {proposals.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {recentListItemKeys.map((key) => {
                  if (key === 'availableStatuses') return null;

                  return (
                    <TableCell key={`Table-head-cell-${key}`}>
                      {recentListItemDictionary[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {proposals.map((proposal) => (
                <DashboardTableRow
                  key={`Table-body-row-${proposal.id}`}
                  proposal={proposal}
                  tracks={tracks.data}
                  isTracksLoading={tracks.isLoading}
                  isTracksError={tracks.isError}
                  tracksError={tracks.error}
                  events={events.data}
                  isEventsLoading={events.isLoading}
                  isEventsError={events.isError}
                  eventsError={events.error}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState
          title="Заявок пока нет"
          subtitle="Когда спикеры отправят заявки, они появятся в этом списке."
        />
      )}
    </SectionCard>
  );
};
export default DashboardRecentTable;
