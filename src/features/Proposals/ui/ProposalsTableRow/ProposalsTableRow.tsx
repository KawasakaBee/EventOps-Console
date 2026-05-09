import {
  formatDictionary,
  levelDictionary,
  proposalListItemKeys,
  proposalTableWidthDictionary,
} from '@/shared/data';
import { Checkbox, Skeleton, TableCell, TableRow } from '@mui/material';
import React, { useMemo } from 'react';
import ProposalsRowActions from '../ProposalsRowActions/ProposalsRowActions';
import getProposalsListRowActions from '@/features/Proposals/model/getProposalsListRowActions';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import { toggleSelectedId } from '../../model/proposalsFiltersSlice';
import { ID } from '@/shared/types/primitives.types';
import {
  IProposalTableRowProps,
  ITableRowProps,
} from './ProposalsTableRow.types';
import { useAppDispatch } from '@/shared/store/hooks';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';

const ProposalsTableRow = React.memo(
  ({
    proposal,
    sx,
    isSelected,
    role,
    tracks,
    setProposal,
  }: IProposalTableRowProps) => {
    const dispatch = useAppDispatch();

    const rowActions = useMemo(
      () => getProposalsListRowActions(role, proposal.status),
      [role, proposal.status],
    );

    const isDataLoaded =
      tracks.status === 'success' || tracks.status === 'error';
    const isError = tracks.status === 'error';

    const track = (proposal: ProposalListItem, tracks: Track[]) => {
      const findedTrack = tracks.find((track) => track.id === proposal.trackId);
      return (
        findedTrack ?? {
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
          if (!isDataLoaded)
            return (
              <Skeleton
                variant="text"
                width={proposalTableWidthDictionary[rowName].skeletonWidth}
              />
            );
          return isError ? tracks.message : track(proposal, tracks.data).title;
        }
        case 'updatedAt':
          return isoToLocalDate(data.updatedAt);
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
                setProposal={setProposal}
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
