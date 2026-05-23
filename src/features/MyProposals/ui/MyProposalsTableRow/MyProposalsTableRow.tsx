import { Skeleton, TableCell, TableRow } from '@mui/material';
import {
  myProposalListItemKeys,
  myProposalTableWidthDictionary,
} from '../../model/tableColumns';
import {
  IMyProposalsTableRowProps,
  IMyTableRowProps,
} from './MyProposalsTableRow.types';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import {
  formatDictionary,
  levelDictionary,
} from '@/entities/proposal/model/dictionaries';
import formatIsoDateTime from '@/shared/utils/formatIsoDateTime';
import getProposalsListRowActions from '@/entities/proposal/lib/getProposalsListRowActions';
import { useMemo } from 'react';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import MyProposalsRowActions from '../MyProposalsRowActions/MyProposalsRowActions';

const MyProposalsTableRow: React.FC<IMyProposalsTableRowProps> = ({
  proposal,
  role,
  tracks,
}) => {
  const rowActions = useMemo(
    () => getProposalsListRowActions(role, proposal.status),
    [role, proposal.status],
  );

  const isDataLoaded = tracks.status === 'success' || tracks.status === 'error';
  const isError = tracks.status === 'error';

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
        if (!isDataLoaded)
          return (
            <Skeleton
              variant="text"
              width={myProposalTableWidthDictionary[rowName].skeletonWidth}
            />
          );
        return isError ? tracks.message : track(proposal, tracks.data).title;
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
