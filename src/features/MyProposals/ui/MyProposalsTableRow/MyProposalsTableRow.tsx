import { Skeleton, TableCell, TableRow } from '@mui/material';
import { myProposalListItemKeys } from '../../model/tableColumns';
import {
  IMyProposalsTableRowProps,
  IMyTableRowProps,
} from './MyProposalsTableRow.types';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import {
  formatDictionary,
  levelDictionary,
} from '@/entities/proposal/model/dictionaries';
import { formatIsoDateTime } from '@/shared/utils/formatTimeAndDate';
import getProposalsListRowActions from '@/entities/proposal/lib/getProposalsListRowActions';
import { useMemo } from 'react';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import MyProposalsRowActions from '../MyProposalsRowActions/MyProposalsRowActions';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';
import { Event } from '@/entities/event/model/types';

const MyProposalsTableRow: React.FC<IMyProposalsTableRowProps> = ({
  proposal,
  role,
  tracks,
  isTracksLoading,
  isTracksError,
  tracksError,
  events,
  isEventsLoading,
  isEventsError,
  eventsError,
  columnsWidth,
}) => {
  const rowActions = useMemo(
    () => getProposalsListRowActions(role, proposal.status),
    [role, proposal.status],
  );

  const track = (proposal: ProposalListItem, tracks: Track[]) => {
    const foundTrack = tracks.find((track) => track.id === proposal.trackId);
    return (
      foundTrack ?? {
        title: 'Трек не удалось загрузить',
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

  const renderCell = ({ rowName, data }: IMyTableRowProps) => {
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
              width={columnsWidth[rowName].skeletonWidth}
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
              width={columnsWidth[rowName].skeletonWidth}
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
      case 'actions':
        return null;
      default:
        return data[rowName];
    }
  };

  return (
    <TableRow>
      {myProposalListItemKeys.map((key) => (
        <TableCell key={`Table-body-cell-${key}`}>
          {key === 'actions' ? (
            <MyProposalsRowActions
              actions={rowActions}
              proposalId={proposal.id}
              proposalStatus={proposal.status}
              availableStatuses={proposal.availableStatuses}
            />
          ) : (
            renderCell({
              rowName: key,
              data: proposal,
            })
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default MyProposalsTableRow;
