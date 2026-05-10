import Button from '@/shared/ui/Button/Button';
import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { ID } from '@/shared/types/primitives.types';
import { useMemo, useState } from 'react';
import { useAppDispatch } from '@/shared/store/hooks';
import { IProposalsBulkActionsProps } from './ProposalsBulkActions.types';
import {
  ProposalListAction,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import getProposalsListActions from '../../model/getProposalsListActions';
import { openMultipleStatusTransition } from '@/features/ProposalStatusTransition/model/proposalStatusTransitionSlice';
import {
  proposalActionsDictionary,
  statusDictionary,
} from '@/entities/proposal/model/dictionaries';

const ProposalsBulkActions: React.FC<IProposalsBulkActionsProps> = ({
  user,
  proposals,
  selectedIds,
  isDisabled,
  availableStatuses,
  currentStatuses,
}) => {
  const dispatch = useAppDispatch();

  const [actionsAnchorEl, setActionsAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const [statusesAnchorEl, setStatusesAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  const availableActions: ProposalListAction[] = useMemo(() => {
    if (
      !user ||
      !proposals ||
      proposals.length === 0 ||
      selectedIds.length === 0
    )
      return [];

    const proposalsMap: Map<ID, ProposalStatus> = new Map(
      proposals.map((proposal) => [proposal.id, proposal.status]),
    );

    const actions: ProposalListAction[][] = selectedIds.map((id) => {
      const value = proposalsMap.get(id);
      if (!value) return [];

      return getProposalsListActions(user.role, value);
    });

    return actions[0].filter((action) =>
      actions.every((arr) => arr.includes(action)),
    );
  }, [user, proposals, selectedIds]);

  const isActionsMenuOpened = !!actionsAnchorEl;
  const isStatusMenuOpened = !!statusesAnchorEl;
  const showMenu =
    availableActions.length > 1 ||
    (availableActions.length === 1 &&
      !availableActions.includes('changeStatus')) ||
    (availableActions.length === 1 &&
      availableActions.includes('changeStatus') &&
      availableStatuses.length !== 0);

  const sx = styles();

  const handleActionsMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setActionsAnchorEl(event.currentTarget);
  };

  const handleStatusesMenuOpen = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setStatusesAnchorEl(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setActionsAnchorEl(null);
  };

  const handleStatusesMenuClose = () => {
    setStatusesAnchorEl(null);
  };

  const handleStatusChange = (status: ProposalStatus) => {
    if (currentStatuses.size === 1 && availableStatuses.includes(status)) {
      dispatch(
        openMultipleStatusTransition({
          ids: selectedIds,
          prevStatus: [...currentStatuses][0],
          nextStatus: status,
        }),
      );
    }
    handleStatusesMenuClose();
    handleActionsMenuClose();
  };

  return (
    <Stack direction="row" spacing={1} sx={sx.actionsWrapper}>
      <Button
        mode="button"
        variant="contained"
        size="small"
        isDisabled={isDisabled || selectedIds.length === 0}
        onClick={handleActionsMenuOpen}
      >
        Действия с выбранными заявками
      </Button>
      <Typography variant="body2">
        Выбрано заявок: {selectedIds.length}
      </Typography>
      <Menu
        open={isActionsMenuOpened}
        anchorEl={actionsAnchorEl}
        onClose={handleActionsMenuClose}
      >
        {showMenu ? (
          availableActions.map((action) =>
            action === 'changeStatus' ? (
              availableStatuses.length !== 0 && (
                <Box key={`Actions-menu-item-${action}`}>
                  <MenuItem onClick={(event) => handleStatusesMenuOpen(event)}>
                    {proposalActionsDictionary[action]}
                  </MenuItem>
                  <Menu
                    open={isStatusMenuOpened}
                    anchorEl={statusesAnchorEl}
                    onClose={handleStatusesMenuClose}
                  >
                    {availableStatuses.map((status) => (
                      <MenuItem
                        key={`Statuses-menu-item-${status}`}
                        onClick={() => handleStatusChange(status)}
                      >
                        {statusDictionary[status]}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )
            ) : (
              <MenuItem
                key={`Actions-menu-item-${action}`}
                disabled //Удалить, когда будут реализованы actions
              >
                {proposalActionsDictionary[action]}
              </MenuItem>
            ),
          )
        ) : (
          <MenuItem key="actions-menu-item-empty}" disabled>
            Нет доступных действий
          </MenuItem>
        )}
      </Menu>
    </Stack>
  );
};

export default ProposalsBulkActions;
