'use client';

import Button from '@/shared/ui/Button/Button';
import { AppBar as MuiAppBar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { IAppBarProps } from './AppBar.types';

const AppBar: React.FC<IAppBarProps> = ({ sx }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
      });

      if (response.ok) {
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MuiAppBar sx={sx}>
      <Button
        mode="button"
        variant="contained"
        size="medium"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Typography variant="h2">This is AppBar</Typography>
    </MuiAppBar>
  );
};

export default AppBar;
