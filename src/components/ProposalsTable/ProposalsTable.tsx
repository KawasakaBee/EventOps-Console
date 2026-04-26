import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IProposalsTableProps, ITableRowProps } from './ProposalsTable.types';
import {
  formatDictionary,
  levelDictionary,
  proposalListItemDictionary,
  proposalListItemKeys,
} from '@/shared/data';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import { styles } from './styles';
import RowActions from '../RowActions/RowActions';
import getProposalListRowActions from '@/shared/utils/getProposalListRowActions';

const ProposalsTable: React.FC<IProposalsTableProps> = ({
  proposals,
  tracks,
  role,
}) => {
  const sx = styles();

  const renderCell = ({ rowName, data, tracksList }: ITableRowProps) => {
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
        return formatDictionary.get(data.format);
      case 'level':
        return levelDictionary.get(data.level);
      case 'trackId': {
        const trackName = tracksList.find((track) => track.id === data.trackId);
        return trackName ? trackName.title : 'ID отсутствует';
      }
      case 'updatedAt':
        return isoToLocalDate(data.updatedAt);
      case 'actions':
        return;
      default:
        return data[rowName];
    }
  };

  return (
    <TableContainer component={Paper} sx={sx.table}>
      <Table>
        <TableHead>
          <TableRow>
            {proposalListItemKeys.map((key) => (
              <TableCell key={`Table-head-cell-${key}`}>
                {proposalListItemDictionary.get(key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {proposals.map((proposal) => {
            return (
              <TableRow key={`Table-body-row-${proposal.id}`}>
                {proposalListItemKeys.map((key) =>
                  key === 'actions' ? (
                    <TableCell key="Table-body-cell-actions">
                      <RowActions
                        actions={getProposalListRowActions(
                          role,
                          proposal.status,
                        )}
                        proposalId={proposal.id}
                      />
                    </TableCell>
                  ) : (
                    <TableCell key={`Table-body-cell-${key}`}>
                      {renderCell({
                        rowName: key,
                        data: proposal,
                        tracksList: tracks,
                      })}
                    </TableCell>
                  ),
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProposalsTable;
