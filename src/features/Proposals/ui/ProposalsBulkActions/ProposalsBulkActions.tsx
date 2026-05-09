import Button from '@/shared/ui/Button/Button';
import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { ID, ProposalListAction } from '@/shared/types/primitives.types';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { IProposalsBulkActionsProps } from './ProposalsBulkActions.types';
import { ProposalStatus } from '@/entities/proposal/model/types';
import getProposalsListActions from '@/features/Proposals/model/getProposalsListActions';
import { proposalActionsDictionary, statusDictionary } from '@/shared/data';
import { addPendingStatus } from '@/features/proposal-status-transition/model/statusTransitionSlice';

const ProposalsBulkActions: React.FC<IProposalsBulkActionsProps> = ({
  user,
  proposals,
  isDisabled,
  availableStatuses,
}) => {
  const dispatch = useAppDispatch();
  const selectedProposalsIds = useAppSelector(
    (store) => store.proposalsFilters.selectedIds,
  );

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
      selectedProposalsIds.length === 0
    )
      return [];

    const proposalsMap: Map<ID, ProposalStatus> = new Map(
      proposals.map((proposal) => [proposal.id, proposal.status]),
    );

    const actions: ProposalListAction[][] = selectedProposalsIds.map((id) => {
      const value = proposalsMap.get(id);
      if (!value) return [];

      return getProposalsListActions(user.role, value);
    });

    return actions[0].filter((action) =>
      actions.every((arr) => arr.includes(action)),
    );
  }, [user, proposals, selectedProposalsIds]);

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
    dispatch(addPendingStatus(status));
    handleStatusesMenuClose();
    handleActionsMenuClose();
  };

  return (
    <Stack direction="row" spacing={1} sx={sx.actionsWrapper}>
      <Button
        mode="button"
        variant="contained"
        size="small"
        isDisabled={isDisabled || selectedProposalsIds.length === 0}
        onClick={handleActionsMenuOpen}
      >
        Действия с выбранными заявками
      </Button>
      <Typography variant="body2">
        Выбрано заявок: {selectedProposalsIds.length}
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
