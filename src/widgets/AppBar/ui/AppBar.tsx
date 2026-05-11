'use client';

import Button from '@/shared/ui/Button/Button';
import { AppBar as MuiAppBar, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { fetchWithDemoAuth } from '@/entities/user/api/fetchWithDemoAuth';
import { useEffect, useState } from 'react';
import getCurrentUser from '@/entities/user/api/userApi';
import { User } from '@/entities/user/model/types';
import { IAppBarProps } from './AppBar.types';
import getAppBarErrorState from '../model/getAppBarErrorState';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';

const AppBar: React.FC<IAppBarProps> = ({ sx }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [errorProps, setErrorProps] = useState<ErrorStateProps | null>(null);

  const handleLogout = async () => {
    const getErrorActions = () => ({
      onClose: () => setErrorProps(null),
    });

    const response = await fetchWithDemoAuth('/api/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      setErrorProps(getAppBarErrorState(response.error, getErrorActions()));
      return;
    }

    router.push('/login');
  };

  useEffect(() => {
    const getErrorActions = () => ({
      onClose: () => setErrorProps(null),
    });

    const getUser = async () => {
      setUser(null);
      setIsLoading(true);

      const response = await getCurrentUser();

      if (!response.ok) {
        setUser(null);
        setErrorProps(getAppBarErrorState(response.error, getErrorActions()));
        setIsLoading(false);
        return;
      }

      setUser(response.data);
      setIsLoading(false);
    };

    getUser();
  }, []);

  return (
    <MuiAppBar sx={sx}>
      {isLoading ? (
        <Skeleton variant="text" width={150} />
      ) : !!errorProps ? (
        <ErrorState {...errorProps} />
      ) : (
        user &&
        user.name && (
          <Typography variant="h2" sx={{ mb: 0 }}>
            {user.name}
          </Typography>
        )
      )}
      {user && !errorProps ? (
        <Button
          mode="button"
          variant="contained"
          size="medium"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      ) : (
        <Button mode="link" variant="contained" size="medium" to="/login">
          На страницу авторизации
        </Button>
      )}
    </MuiAppBar>
  );
};

export default AppBar;
