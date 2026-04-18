'use client';

import Button from '@/shared/ui/Button/Button';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const roles = ['manager', 'reviewer', 'speaker'] as const;

const redirectByRole: Record<DemoLoginRequest['role'], string> = {
  manager: '/dashboard',
  reviewer: '/proposals',
  speaker: '/my-proposals',
};

const Login = () => {
  const router = useRouter();

  const handleDemoLogin = async (role: DemoLoginRequest['role']) => {
    try {
      const response = await fetch('/api/demo-login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ role: role }),
      });

      if (response.ok) {
        router.push(redirectByRole[role]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUser = async () => {
    try {
      const response = await fetch('/api/me', {
        method: 'GET',
      });

      if (response.ok) {
        console.log(await response.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        {roles.map((role) => (
          <Button
            key={role}
            mode="button"
            variant="contained"
            size="medium"
            onClick={() => handleDemoLogin(role)}
          >
            Войти как {role}
          </Button>
        ))}
      </Stack>
      <Button
        mode="button"
        variant="contained"
        size="medium"
        onClick={handleUser}
      >
        Показать мои данные!
      </Button>
    </>
  );
};

export default Login;
