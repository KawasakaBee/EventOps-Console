'use client';

import Button from '@/shared/ui/Button/Button';
import { AppBar as MuiAppBar, Typography } from '@mui/material';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import { useAuth } from '@/entities/user/model/AuthProvider';
import useAppBarData from '../model/useAppBarData';
import { styles } from './styles';

const AppBar = () => {
  const { user } = useAuth();

  const { errorProps, handleLogout } = useAppBarData();

  const sx = styles();

  return (
    <MuiAppBar sx={sx.appBar}>
      <Typography variant="h2" sx={sx.appBarTitle}>
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
