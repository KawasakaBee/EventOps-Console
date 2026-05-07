import {
  formatDictionary,
  levelDictionary,
  proposalListItemKeys,
} from '@/shared/data';
import { Checkbox, TableCell, TableRow } from '@mui/material';
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

    const renderCell = ({ rowName, data, tracksById }: ITableRowProps) => {
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
          const trackName = tracksById.get(data.trackId);
          return trackName ? trackName : 'Неизвестный трек';
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
                tracksById: tracks,
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
