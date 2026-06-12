import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { styles } from './styles';
import { IProposalStickyPanelProps } from './ProposalStickyPanel.types';
import {
  Box,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { formatIsoDateTime } from '@/shared/utils/formatTimeAndDate';
import { useMemo, useState } from 'react';
import Button from '@/shared/ui/Button/Button';
import SecondaryStickyButtons from '../SecondaryStickyButtons/SecondaryStickyButtons';
import { useAppDispatch } from '@/shared/store/hooks';
import { Track } from '@/entities/track/model/types';
import {
  AdditionalAction,
  CriticalAction,
  Proposal,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { openSingleStatusTransition } from '@/features/ProposalStatusTransition/model/proposalStatusTransitionSlice';
import {
  availableActionsDictionary,
  formatDictionary,
  levelDictionary,
  statusDictionary,
} from '@/entities/proposal/model/dictionaries';
import {
  isAdditionalAvailableAction,
  isCriticalAvailableAction,
} from '@/entities/proposal/model/typeGuards';
import formatMinutesDuration from '@/shared/utils/formatMinutesDuration';
import { useRouter } from 'next/navigation';
import { openSingleAssignReviewer } from '@/features/ReviewerAssign/model/reviewerAssignSlice';
import { openCreateReviewDialog } from '@/features/ReviewCreate/model/reviewCreateSlice';
import { openAddCommentDialog } from '@/features/CommentAdd/model/commentAddSlice';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { theme } from '@/shared/theme/theme';
import useViewportWidth from '@/shared/utils/hooks/useViewportWidth';

const ProposalStickyPanel: React.FC<IProposalStickyPanelProps> = ({
  details,
}) => {
  const router = useRouter();
  const { proposal, availableActions } = details;
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, error } = useGetTracksQuery();

  const [statusMenuAnchorEl, setStatusMenuAnchorEl] =
    useState<HTMLElement | null>(null);

  const criticalActions: CriticalAction[] = useMemo(
    () => availableActions.filter(isCriticalAvailableAction),
    [availableActions],
  );
  const additionalActions: AdditionalAction[] = useMemo(
    () => availableActions.filter(isAdditionalAvailableAction),
    [availableActions],
  );

  const isAcceptAndRejectButtonDisabled = details.reviews.length === 0;
  const isStatusMenuOpened = !!statusMenuAnchorEl;

  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const viewportWidth = useViewportWidth();
  const sx = styles({ isDesktop, isLaptop, viewportWidth });

  const track = (proposal: Proposal, tracks: Track[]) => {
    const foundTrack = tracks.find((track) => track.id === proposal.trackId);
    return (
      foundTrack ?? {
        title: 'Трек не удалось загрузить',
      }
    );
  };

  const handleStatusMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setStatusMenuAnchorEl(event.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchorEl(null);
  };

  const handlePendingStatusChange = (status: ProposalStatus) => {
    if (
      (status === 'accepted' || status === 'rejected') &&
      isAcceptAndRejectButtonDisabled
    )
      return;

    setStatusMenuAnchorEl(null);

    if (!details.proposal) return;

    dispatch(
      openSingleStatusTransition({
        id: details.proposal.id,
        prevStatus: details.proposal.status,
        nextStatus: status,
      }),
    );
  };

  const handleToEditRedirect = () => {
    if (!proposal || proposal.status !== 'draft') return;
    router.push(`/submit/${proposal.id}`);
  };

  const handleReviewerAssignDialogOpen = () => {
    if (!details.proposal) return;
    dispatch(
      openSingleAssignReviewer({
        id: details.proposal.id,
        eventIds: [details.proposal.eventId],
      }),
    );
  };

  const handleReviewCreateDialogOpen = () => {
    if (!details.proposal) return;
    dispatch(openCreateReviewDialog({ id: details.proposal.id }));
  };

  const handleCommentAddDialogOpen = () => {
    if (!details.proposal) return;
    dispatch(openAddCommentDialog({ id: details.proposal.id }));
  };

  const handleToScheduleRedirect = () => {
    if (!proposal || proposal.status !== 'accepted') return;
    router.push(`/schedule?eventId=${proposal.eventId}`);
  };

  return (
    <SectionCard title={null}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Stack sx={sx.proposalStickyPanelStatusWrap}>
            <Typography variant="subtitle2">Статус:</Typography>
            {proposal ? (
              <StatusChip
                status={proposal.status}
                type="outlined"
                shape="rounded"
                size="small"
              />
            ) : (
              '—'
            )}
          </Stack>
          <Box>
            <Typography variant="subtitle2">Последнее обновление:</Typography>
            {proposal ? (
              <Typography
                variant="caption"
                sx={sx.proposalStickyPanelLastUpdateTime}
              >
                {formatIsoDateTime(proposal.updatedAt)}
              </Typography>
            ) : (
              '—'
            )}
          </Box>
        </Stack>
        {criticalActions.length !== 0 && (
          <Stack spacing={1}>
            {criticalActions.map((action) =>
              action === 'accept' || action === 'reject' ? (
                <Tooltip
                  key={action}
                  title="У заявки должно быть ревью, чтобы продолжить"
                  placement="top"
                >
                  <Box>
                    <Button
                      mode="button"
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        handlePendingStatusChange(
                          action === 'accept' ? 'accepted' : 'rejected',
                        )
                      }
                      isDisabled={isAcceptAndRejectButtonDisabled}
                      sx={sx.proposalStickyPanelActionButton}
                      intent={action === 'accept' ? 'success' : 'danger'}
                    >
                      {availableActionsDictionary[action]}
                    </Button>
                  </Box>
                </Tooltip>
              ) : (
                <Button
                  key={action}
                  mode="button"
                  variant="contained"
                  size="small"
                  sx={sx.proposalStickyPanelActionButton}
                  onClick={handleToEditRedirect}
                >
                  {availableActionsDictionary[action]}
                </Button>
              ),
            )}
          </Stack>
        )}
        {additionalActions.length !== 0 && (
          <Stack spacing={1}>
            {additionalActions.map((action) =>
              action === 'changeStatus' ? (
                details.availableStatuses.length !== 0 && (
                  <Box key={action}>
                    <Button
                      mode="button"
                      variant="outlined"
                      size="small"
                      onClick={handleStatusMenuOpen}
                      sx={sx.proposalStickyPanelActionButton}
                    >
                      {availableActionsDictionary[action]}
                    </Button>
                    <Menu
                      open={isStatusMenuOpened}
                      anchorEl={statusMenuAnchorEl}
                      onClose={handleStatusMenuClose}
                    >
                      {details.availableStatuses.length !== 0 ? (
                        details.availableStatuses.map((status) => (
                          <MenuItem
                            key={`Statuses-menu-item-${status}`}
                            onClick={() => handlePendingStatusChange(status)}
                          >
                            {statusDictionary[status]}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem key="Statuses-menu-item-empty}" disabled>
                          Нет доступных действий
                        </MenuItem>
                      )}
                    </Menu>
                  </Box>
                )
              ) : action === 'requestChanges' ? (
                <Button
                  key={action}
                  mode="button"
                  variant="outlined"
                  size="small"
                  sx={sx.proposalStickyPanelActionButton}
                  onClick={() => handlePendingStatusChange('changes_requested')}
                >
                  {availableActionsDictionary[action]}
                </Button>
              ) : action === 'assignReviewer' ? (
                <Button
                  key={action}
                  mode="button"
                  variant="outlined"
                  size="small"
                  sx={sx.proposalStickyPanelActionButton}
                  onClick={handleReviewerAssignDialogOpen}
                >
                  {availableActionsDictionary[action]}
                </Button>
              ) : action === 'addReview' ? (
                <Button
                  key={action}
                  mode="button"
                  variant="outlined"
                  size="small"
                  sx={sx.proposalStickyPanelActionButton}
                  onClick={handleReviewCreateDialogOpen}
                >
                  {availableActionsDictionary[action]}
                </Button>
              ) : action === 'addComment' ? (
                <Button
                  key={action}
                  mode="button"
                  variant="outlined"
                  size="small"
                  sx={sx.proposalStickyPanelActionButton}
                  onClick={handleCommentAddDialogOpen}
                >
                  {availableActionsDictionary[action]}
                </Button>
              ) : (
                action === 'schedule' && (
                  <Button
                    key={action}
                    mode="button"
                    variant="outlined"
                    size="small"
                    sx={sx.proposalStickyPanelActionButton}
                    onClick={handleToScheduleRedirect}
                  >
                    {availableActionsDictionary[action]}
                  </Button>
                )
              ),
            )}
          </Stack>
        )}
        <SecondaryStickyButtons />
        <Stack spacing={1}>
          {!isLoading && details.proposal ? (
            <Typography variant="subtitle2">
              Трек:{' '}
              <b>
                {isError
                  ? getApiErrorMessage(error)
                  : data
                    ? track(details.proposal, data.tracks).title
                    : 'Не удалось загрузить трек'}
              </b>
            </Typography>
          ) : (
            <Skeleton variant="text" width={200} />
          )}
          <Typography variant="subtitle2">
            Формат:{' '}
            <b>
              {proposal
                ? formatDictionary[proposal.format]
                : 'Формат не удалось загрузить'}
            </b>
          </Typography>
          <Typography variant="subtitle2">
            Уровень:{' '}
            <b>
              {proposal
                ? levelDictionary[proposal.level]
                : 'Уровень не удалось загрузить'}
            </b>
          </Typography>
          <Typography variant="subtitle2">
            Продолжительность:{' '}
            <b>
              {proposal
                ? formatMinutesDuration(proposal.duration)
                : 'Продолжительность не удалось загрузить'}
            </b>
          </Typography>
        </Stack>
      </Stack>
    </SectionCard>
  );
};

export default ProposalStickyPanel;
