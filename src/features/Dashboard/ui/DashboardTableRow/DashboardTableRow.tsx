import {
  IDashboardTableRowProps,
  ITableRowProps,
} from './DashboardTableRow.types';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { Event } from '@/entities/event/model/types';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import {
  formatDictionary,
  levelDictionary,
} from '@/entities/proposal/model/dictionaries';
import { Skeleton, TableCell, TableRow } from '@mui/material';
import {
  recentListItemKeys,
  recentTableWidthDictionary,
} from '../../model/tableColumns';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';
import { formatIsoDateTime } from '@/shared/utils/formatTimeAndDate';

const DashboardTableRow = ({
  proposal,
  tracks,
  isTracksLoading,
  isTracksError,
  tracksError,
  events,
  isEventsLoading,
  isEventsError,
  eventsError,
}: IDashboardTableRowProps) => {
  const track = (proposal: ProposalListItem, tracks: Track[]) => {
    const foundTrack = tracks.find((track) => track.id === proposal.trackId);
    return (
      foundTrack ?? {
        id: '',
        title: 'Трек не удалось загрузить',
        description: '',
        order: 0,
      }
    );
  };

  const event = (proposal: ProposalListItem, events: Event[]) => {
    const foundEvent = events.find((event) => event.id === proposal.eventId);
    return (
      foundEvent ?? {
        title: 'Событие не удалось загрузить',
      }
    );
  };

  const renderCell = ({ rowName, data }: ITableRowProps) => {
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
        return formatDictionary[data.format];
      case 'level':
        return levelDictionary[data.level];
      case 'trackId': {
        if (isTracksLoading)
          return (
            <Skeleton
              variant="text"
              width={recentTableWidthDictionary[rowName].skeletonWidth}
            />
          );
        return isTracksError
          ? getApiErrorMessage(tracksError)
          : tracks
            ? track(proposal, tracks.tracks).title
            : 'Не удалось загрузить трек';
      }
      case 'eventId': {
        if (isEventsLoading)
          return (
            <Skeleton
              variant="text"
              width={recentTableWidthDictionary[rowName].skeletonWidth}
            />
          );
        return isEventsError
          ? getApiErrorMessage(eventsError)
          : events
            ? event(proposal, events.events).title
            : 'Не удалось загрузить событие';
      }
      case 'updatedAt':
        return formatIsoDateTime(data.updatedAt);
      default:
        return data[rowName];
    }
  };

  return (
    <TableRow>
      {recentListItemKeys.map((key) => (
        <TableCell key={`Table-body-cell-${key}`}>
          {renderCell({
            rowName: key,
            data: proposal,
          })}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default DashboardTableRow;
