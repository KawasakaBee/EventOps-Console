import { Box, Menu, MenuItem, Stack } from '@mui/material';
import { IProposalsRowActionProps } from './ProposalsRowActions.types';
import Button from '@/shared/ui/Button/Button';
import { useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { proposalActionsDictionary, statusDictionary } from '@/shared/data';
import { styles } from './styles';
import getAvailableStatusesToChange from '@/shared/utils/getAvailableStatusesToChange';
import { useAppDispatch } from '@/shared/store/hooks';
import { ProposalStatus } from '@/entities/proposal/model/types';
import { addPendingStatus } from '@/features/proposal-status-transition/model/statusTransitionSlice';

const ProposalsRowActions: React.FC<IProposalsRowActionProps> = ({
  actions,
  proposalId,
  proposalStatus,
  setProposal,
}) => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [statusesAnchorEl, setStatusesAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  const actionsWithoutDetails = useMemo(() => {
    return actions.filter((action) => action !== 'viewDetails');
  }, [actions]);
  const availableStatuses = useMemo(
    () => getAvailableStatusesToChange(proposalStatus),
    [proposalStatus],
  );

  const isMenuOpened = !!anchorEl;
  const isStatusMenuOpened = !!statusesAnchorEl;
  const showMenu =
    actionsWithoutDetails.length > 1 ||
    (actionsWithoutDetails.length === 1 &&
      !actionsWithoutDetails.includes('changeStatus')) ||
    (actionsWithoutDetails.length === 1 &&
      actionsWithoutDetails.includes('changeStatus') &&
      availableStatuses.length !== 0);

  const sx = styles();

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusesMenuOpen = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setStatusesAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusesMenuClose = () => {
    setStatusesAnchorEl(null);
  };

  const handleStatusChange = (status: ProposalStatus) => {
    setProposal({ status: proposalStatus, id: proposalId });
    dispatch(addPendingStatus(status));
    handleStatusesMenuClose();
    handleMenuClose();
  };

  return (
    <Stack direction="row" spacing={1} sx={sx.actionsContainer}>
      {actions.includes('viewDetails') && (
        <Button
          mode="link"
          variant="contained"
          size="small"
          to={`/proposals/${proposalId}`}
          isRelativeLink
        >
          {proposalActionsDictionary['viewDetails']}
        </Button>
      )}
      {showMenu && (
        <Box>
          <Button
            mode="iconButton"
            size="small"
            variant="outlined"
            ariaLabel="Меню действий над заявкой"
            icon={MoreVertIcon}
            onClick={handleMenuOpen}
          />
          <Menu
            open={isMenuOpened}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
          >
            {actionsWithoutDetails.map((action) =>
              action === 'changeStatus' ? (
                availableStatuses.length !== 0 && (
                  <Box key={`Actions-menu-item-${action}`}>
                    <MenuItem
                      onClick={(event) => handleStatusesMenuOpen(event)}
                    >
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
            )}
          </Menu>
        </Box>
      )}
    </Stack>
  );
};

export default ProposalsRowActions;
