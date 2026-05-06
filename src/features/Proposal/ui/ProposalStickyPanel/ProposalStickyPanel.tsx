import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { styles } from './styles';
import { IProposalStickyPanelProps } from './ProposalStickyPanel.types';
import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import { useMemo, useState } from 'react';
import { AdditionalAction, CriticalAction } from '../../model/actions';
import {
  isAdditionalAvailableAction,
  isCriticalAvailableAction,
} from '@/shared/utils/typeGuards';
import Button from '@/shared/ui/Button/Button';
import {
  availableActionsDictionary,
  formatDictionary,
  levelDictionary,
  statusDictionary,
} from '@/shared/data';
import SecondaryStickyButtons from '../SecondaryStickyButtons/SecondaryStickyButtons';
import formatDuration from '@/shared/utils/formatDuration';
import getAvailableStatusesToChange from '@/shared/utils/getAvailableStatusesToChange';
import { useAppDispatch } from '@/shared/store/hooks';
import { ProposalStatus } from '@/entities/proposal/model/types';
import { addPendingStatus } from '@/features/proposal-status-transition/model/statusTransitionSlice';

const ProposalStickyPanel: React.FC<IProposalStickyPanelProps> = ({
  data,
  trackName,
}) => {
  const { proposal, availableActions } = data;
  const dispatch = useAppDispatch();

  const [statusMenuAnchorEl, setStatusMenuAnchorEl] =
    useState<HTMLElement | null>(null);

  const availableStatuses = useMemo(
    () => (proposal ? getAvailableStatusesToChange(proposal.status) : []),
    [proposal],
  );
  const criticalActions: CriticalAction[] = useMemo(
    () => availableActions.filter(isCriticalAvailableAction),
    [availableActions],
  );
  const additionalActions: AdditionalAction[] = useMemo(
    () => availableActions.filter(isAdditionalAvailableAction),
    [availableActions],
  );

  const isStatusMenuOpened = !!statusMenuAnchorEl;

  const sx = styles({ action: 'edit' });

  const handleStatusMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setStatusMenuAnchorEl(event.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchorEl(null);
  };

  const handlePendingStatusChange = (status: ProposalStatus) => {
    setStatusMenuAnchorEl(null);
    dispatch(addPendingStatus(status));
  };

  return (
    <SectionCard title={null}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Box>
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
          </Box>
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
                <Button
                  key={action}
                  mode="button"
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    handlePendingStatusChange(
                      action === 'accept' ? 'accepted' : 'rejected',
                    )
                  }
                  sx={styles({ action }).criticalButton}
                >
                  {availableActionsDictionary[action]}
                </Button>
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
                availableStatuses.length !== 0 && (
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
                      {availableStatuses.length !== 0 ? (
                        availableStatuses.map((status) => (
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
          <Typography variant="subtitle2">
            Трек: <b>{trackName ?? '—'}</b>
          </Typography>
          <Typography variant="subtitle2">
            Формат: <b>{proposal ? formatDictionary[proposal.format] : '—'}</b>
          </Typography>
          <Typography variant="subtitle2">
            Уровень: <b>{proposal ? levelDictionary[proposal.level] : '—'}</b>
          </Typography>
          <Typography variant="subtitle2">
            Продолжительность:{' '}
            <b>{proposal ? formatDuration(proposal.duration) : '—'}</b>
          </Typography>
        </Stack>
      </Stack>
    </SectionCard>
  );
};

export default ProposalStickyPanel;
