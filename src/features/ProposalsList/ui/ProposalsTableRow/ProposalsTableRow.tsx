import { Checkbox, Skeleton, TableCell, TableRow } from '@mui/material';
import { memo, useMemo } from 'react';
import ProposalsRowActions from '../ProposalsRowActions/ProposalsRowActions';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import formatIsoDateTime from '@/shared/utils/formatIsoDateTime';
import { toggleSelectedId } from '../../model/proposalsListSlice';
import { ID } from '@/shared/types/primitives.types';
import {
  IProposalTableRowProps,
  ITableRowProps,
} from './ProposalsTableRow.types';
import { useAppDispatch } from '@/shared/store/hooks';
import { Track } from '@/entities/track/model/types';
import { ProposalListItem } from '@/entities/proposal/model/types';
import {
  formatDictionary,
  levelDictionary,
} from '@/entities/proposal/model/dictionaries';
import {
  proposalListItemKeys,
  proposalTableWidthDictionary,
} from '../../model/tableColumns';
import getProposalsListRowActions from '@/entities/proposal/lib/getProposalsListRowActions';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';

const ProposalsTableRow = memo(
  ({
    proposal,
    sx,
    isSelected,
    role,
    tracks,
    isTracksLoading,
    isTracksError,
    tracksError,
  }: IProposalTableRowProps) => {
    const dispatch = useAppDispatch();

    const rowActions = useMemo(
      () => getProposalsListRowActions(role, proposal.status),
      [role, proposal.status],
    );

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
                width={proposalTableWidthDictionary[rowName].skeletonWidth}
              />
            );
          return isTracksError
            ? getApiErrorMessage(tracksError)
            : tracks
              ? track(proposal, tracks.tracks).title
              : 'Не удалось загрузить трек';
        }
        case 'updatedAt':
          return formatIsoDateTime(data.updatedAt);
        case 'actions':
          return null;
        case 'checkbox':
          return null;
        default:
          return data[rowName];
      }
    };

    const handleToggleSelectProposal = (id: ID) => {
      dispatch(toggleSelectedId(id));
    };

    return (
      <TableRow>
        {proposalListItemKeys.map((key) => (
          <TableCell key={`Table-body-cell-${key}`}>
            {key === 'checkbox' ? (
              <Checkbox
                sx={sx}
                checked={isSelected}
                onChange={() => handleToggleSelectProposal(proposal.id)}
              />
            ) : key === 'actions' ? (
              <ProposalsRowActions
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
  },
);

ProposalsTableRow.displayName = 'ProposalsTableRow';

export default ProposalsTableRow;
