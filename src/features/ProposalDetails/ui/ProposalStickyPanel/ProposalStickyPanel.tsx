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
} from '@mui/material';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import { useMemo, useState } from 'react';
import {
  isAdditionalAvailableAction,
  isCriticalAvailableAction,
} from '@/shared/utils/typeGuards';
import Button from '@/shared/ui/Button/Button';
import SecondaryStickyButtons from '../SecondaryStickyButtons/SecondaryStickyButtons';
import formatDuration from '@/shared/utils/formatDuration';
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
  formatDictionary,
  levelDictionary,
  statusDictionary,
} from '@/entities/proposal/model/dictionaries';
import { availableActionsDictionary } from '@/shared/config/permissions';

const ProposalStickyPanel: React.FC<IProposalStickyPanelProps> = ({
  data,
  tracks,
}) => {
  const { proposal, availableActions } = data;
  const dispatch = useAppDispatch();

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

  const isDataLoaded = tracks.status === 'success' || tracks.status === 'error';
  const isError = tracks.status === 'error';

  const isAcceptAndRejectButtonDisable = data.reviews.length === 0;
  const isStatusMenuOpened = !!statusMenuAnchorEl;

  const sx = styles({ action: 'edit' });

  const track = (proposal: Proposal, tracks: Track[]) => {
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
      isAcceptAndRejectButtonDisable
    )
      return;

    setStatusMenuAnchorEl(null);

    if (!data.proposal) return;

    dispatch(
      openSingleStatusTransition({
        id: data.proposal.id,
        prevStatus: data.proposal.status,
        nextStatus: status,
      }),
    );
  };

  return (
    <SectionCard title={null}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Stack sx={sx.statusWrapper}>
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
              <Typography variant="caption" sx={sx.lastUpdateTime}>
                {isoToLocalDate(proposal.updatedAt)}
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
                      isDisabled={isAcceptAndRejectButtonDisable}
                      sx={styles({ action }).criticalButton}
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
                  sx={styles({ action }).criticalButton}
                  isDisabled
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
                data.availableStatuses.length !== 0 && (
                  <Box key={action}>
                    <Button
                      mode="button"
                      variant="outlined"
                      size="small"
                      onClick={handleStatusMenuOpen}
                      sx={sx.statusButton}
                    >
                      {availableActionsDictionary[action]}
                    </Button>
                    <Menu
                      open={isStatusMenuOpened}
                      anchorEl={statusMenuAnchorEl}
                      onClose={handleStatusMenuClose}
                    >
                      {data.availableStatuses.length !== 0 ? (
                        data.availableStatuses.map((status) => (
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
                  onClick={() => handlePendingStatusChange('changes_requested')}
                >
                  {availableActionsDictionary[action]}
                </Button>
              ) : (
                <Button
                  key={action}
                  mode="button"
                  variant="outlined"
                  size="small"
                  isDisabled
                >
                  {availableActionsDictionary[action]}
                </Button>
              ),
            )}
          </Stack>
        )}
        <SecondaryStickyButtons />
        <Stack spacing={1}>
          {isDataLoaded && data.proposal ? (
            <Typography variant="subtitle2">
              Трек:{' '}
              <b>
                {isError
                  ? tracks.message
                  : track(data.proposal, tracks.data).title}
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
                ? formatDuration(proposal.duration)
                : 'Продолжительность не удалось загрузить'}
            </b>
          </Typography>
        </Stack>
      </Stack>
    </SectionCard>
  );
};

export default ProposalStickyPanel;
