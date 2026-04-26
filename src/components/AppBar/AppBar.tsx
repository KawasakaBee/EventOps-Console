'use client';

import Button from '@/shared/ui/Button/Button';
import { AppBar as MuiAppBar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { IAppBarProps } from './AppBar.types';
import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';
import { useEffect, useState } from 'react';
import getCurrentUser from '@/shared/utils/getCurrentUser';
import { User } from '@/entities/user/model/types';

const AppBar: React.FC<IAppBarProps> = ({ sx }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
    try {
      const response = await fetchWithDemoAuth('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getCurrentUser();
      if (data) setUser(data);
    })();
  }, []);

  return (
    <MuiAppBar sx={sx}>
      {user && user.name && (
        <Typography variant="h2" sx={{ mb: 0 }}>
          {user.name}
        </Typography>
      )}
      <Button
        mode="button"
        variant="contained"
        size="medium"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </MuiAppBar>
  );
};

export default AppBar;
