import { Box, Skeleton, TableCell, TableRow, Typography } from '@mui/material';
import {
  IAuditRenderCellProps,
  IAuditTableRowProps,
} from './AuditTableRow.types';
import { auditListItemKeys } from '../../model/tableColumns';
import {
  auditActionsDictionary,
  auditEntitiesDictionary,
} from '@/entities/audit/model/dictionaries';
import { formatIsoDateTime } from '@/shared/utils/formatTimeAndDate';
import formatHistoryPayloadLines from '@/entities/history/lib/formatHistoryPayloadLines';
import { styles } from './styles';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';

const AuditTableRow: React.FC<IAuditTableRowProps> = ({
  auditItem,
  users,
  isUsersLoading,
  isUsersError,
  usersError,
  reviewers,
  isReviewersLoading,
  isReviewersError,
  comments,
  isCommentsLoading,
  isCommentsError,
  events,
  isEventsLoading,
  isEventsError,
  columnsWidth,
}) => {
  const sx = styles();

  const normalizedHistoryPayload = () => {
    if (!auditItem.payload || isReviewersLoading || isCommentsLoading)
      return null;

    const normalizePayload = formatHistoryPayloadLines(
      auditItem.payload,
      isReviewersError ? null : (reviewers?.reviewers ?? null),
      isCommentsError ? [] : (comments?.comments ?? []),
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
      case 'eventId':
        if (isEventsLoading)
          return (
            <Skeleton
              variant="text"
              width={columnsWidth['eventId'].skeletonWidth}
            />
          );
        if (isEventsError) return 'Не удалось определить событие';
        const event = events
          ? events.events.find((event) => event.id === data.eventId)
          : null;
        return event?.title ?? 'Не удалось определить событие';
      case 'actorId': {
        if (isUsersLoading)
          return (
            <Skeleton
              variant="text"
              width={columnsWidth['actorId'].skeletonWidth}
            />
          );
        if (isUsersError) return getApiErrorMessage(usersError);

        const currentUser = users
          ? users.users.find((user) => user.id === data.actorId)
          : null;

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
