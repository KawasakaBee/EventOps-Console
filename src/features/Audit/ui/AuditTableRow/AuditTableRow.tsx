import { Box, Skeleton, TableCell, TableRow, Typography } from '@mui/material';
import {
  IAuditRenderCellProps,
  IAuditTableRowProps,
} from './AuditTableRow.types';
import {
  auditListItemKeys,
  auditTableWidthDictionary,
} from '../../model/tableColumns';
import {
  auditActionsDictionary,
  auditEntitiesDictionary,
} from '@/entities/audit/model/dictionaries';
import formatIsoDateTime from '@/shared/utils/formatIsoDateTime';
import formatHistoryPayloadLines from '@/entities/history/lib/formatHistoryPayloadLines';
import { styles } from './styles';

const AuditTableRow: React.FC<IAuditTableRowProps> = ({
  auditItem,
  users,
  reviewers,
  comments,
}) => {
  const isUsersDataLoaded =
    users.status === 'success' || users.status === 'error';
  const isUsersError = users.status === 'error';
  const isReviewersDataLoaded =
    reviewers.status === 'success' || reviewers.status === 'error';
  const isReviewersError = reviewers.status === 'error';
  const isCommentsDataLoaded =
    comments.status === 'success' || comments.status === 'error';
  const isCommentsError = comments.status === 'error';

  const sx = styles();

  const normalizedHistoryPayload = () => {
    if (!auditItem.payload || !isReviewersDataLoaded || !isCommentsDataLoaded)
      return null;

    const normalizePayload = formatHistoryPayloadLines(
      auditItem.payload,
      isReviewersError ? null : reviewers.data,
      isCommentsError ? [] : comments.data,
    );
    if (!normalizePayload) return 'Нет примечания';

    return (
      <Box>
        {normalizePayload.map((obj, idx) => (
          <Typography key={idx} variant="body2" sx={sx.payload}>
            {obj}
          </Typography>
        ))}
      </Box>
    );
  };

  const renderCell = ({ rowName, data }: IAuditRenderCellProps) => {
    switch (rowName) {
      case 'id':
        return data.id;
      case 'action':
        return auditActionsDictionary[data.action];
      case 'entityType':
        return auditEntitiesDictionary[data.entityType];
      case 'entityId':
        return data.entityId;
      case 'actorId': {
        if (!isUsersDataLoaded)
          return (
            <Skeleton
              variant="text"
              width={auditTableWidthDictionary['actorId'].skeletonWidth}
            />
          );
        if (isUsersError) return users.message;

        const currentUser = users.data.find((user) => user.id === data.actorId);

        return currentUser?.name ?? 'Пользователь не найден';
      }
      case 'payload':
        return normalizedHistoryPayload();
      case 'createdAt':
        return formatIsoDateTime(data.createdAt);
      default:
        return data[rowName];
    }
  };

  return (
    <TableRow>
      {auditListItemKeys.map((key) => (
        <TableCell key={`Table-body-cell-${key}`}>
          {renderCell({
            rowName: key,
            data: auditItem,
          })}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default AuditTableRow;
