import { Box, Menu, MenuItem, Stack } from '@mui/material';
import { IRowActionProps } from './RowActions.types';
import Button from '@/shared/ui/Button/Button';
import { useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { proposalActionsDictionary } from '@/shared/data';
import { styles } from './styles';

const RowActions: React.FC<IRowActionProps> = ({ actions, proposalId }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpened = !!anchorEl;

  const actionsWithoutDetails = useMemo(() => {
    return actions.filter((action) => action !== 'viewDetails');
  }, [actions]);

  const sx = styles();

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
          {proposalActionsDictionary.get('viewDetails')}
        </Button>
      )}
      {actionsWithoutDetails.length !== 0 && (
        <Box>
          <Button
            mode="iconButton"
            size="small"
            variant="outlined"
            ariaLabel="Меню действий над заявкой"
            icon={MoreVertIcon}
            onClick={handleOpenMenu}
          />
          <Menu
            open={isMenuOpened}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
          >
            {actionsWithoutDetails.map((action) => {
              return (
                <MenuItem
                  key={`Actions-menu-item-${action}`}
                  onClick={handleCloseMenu}
                >
                  {proposalActionsDictionary.get(action)}
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      )}
    </Stack>
  );
};

export default RowActions;
