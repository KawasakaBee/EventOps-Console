import { useAppDispatch } from '@/shared/store/hooks';
import { IMyProposalsRowActionsProps } from './MyProposalsRowActions.types';
import { useMemo, useState } from 'react';
import { styles } from './styles';
import { openSingleStatusTransition } from '@/features/ProposalStatusTransition/model/proposalStatusTransitionSlice';
import { ProposalStatus } from '@/entities/proposal/model/types';
import { Box, Menu, MenuItem, Stack } from '@mui/material';
import Button from '@/shared/ui/Button/Button';
import {
  proposalActionsDictionary,
  statusDictionary,
} from '@/entities/proposal/model/dictionaries';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';

const MyProposalsRowActions: React.FC<IMyProposalsRowActionsProps> = ({
  actions,
  proposalId,
  proposalStatus,
  availableStatuses,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [statusesAnchorEl, setStatusesAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  const actionsWithoutDetails = useMemo(() => {
    return actions.filter((action) => action !== 'viewDetails');
  }, [actions]);

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
    dispatch(
      openSingleStatusTransition({
        id: proposalId,
        prevStatus: proposalStatus,
        nextStatus: status,
      }),
    );
    handleStatusesMenuClose();
    handleMenuClose();
  };

  const handleToEditRedirect = () => {
    if (proposalStatus !== 'draft') return;
    router.push(`/submit/${proposalId}`);
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
              ) : action === 'edit' ? (
                <MenuItem
                  key={`Actions-menu-item-${action}`}
                  onClick={handleToEditRedirect}
                >
                  {proposalActionsDictionary[action]}
                </MenuItem>
              ) : (
                <MenuItem
                  key={`Actions-menu-item-${action}`}
                  disabled // Убрать когда появятся actions
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
export default MyProposalsRowActions;
