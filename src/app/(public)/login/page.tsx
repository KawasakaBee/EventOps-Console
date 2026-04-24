'use client';

import { PostDemoLoginRequest } from '@/shared/api/contracts/auth.contract';
import Button from '@/shared/ui/Button/Button';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const roles = ['manager', 'reviewer', 'speaker'] as const;

const redirectByRole: Record<PostDemoLoginRequest['role'], string> = {
  manager: '/dashboard',
  reviewer: '/proposals',
  speaker: '/my-proposals',
};

const Login = () => {
  const router = useRouter();

  const handleDemoLogin = async (role: PostDemoLoginRequest['role']) => {
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
        router.refresh();
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
    </>
  );
};

export default Login;
