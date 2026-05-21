'use client';

import Button from '@/shared/ui/Button/Button';
import { AppBar as MuiAppBar, Typography } from '@mui/material';
import { IAppBarProps } from './AppBar.types';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import { useAuth } from '@/entities/user/model/AuthProvider';
import useAppBarData from '../model/useAppBarData';

const AppBar: React.FC<IAppBarProps> = ({ sx }) => {
  const { user } = useAuth();

  const { errorProps, handleLogout } = useAppBarData();

  return (
    <MuiAppBar sx={sx}>
      <Typography variant="h2" sx={{ mb: 0 }}>
        {user.name}
      </Typography>
      <Button
        mode="button"
        variant="contained"
        size="medium"
        onClick={handleLogout}
      >
        Выйти
      </Button>
      {errorProps && <ErrorState {...errorProps} />}
    </MuiAppBar>
  );
};

export default AppBar;
