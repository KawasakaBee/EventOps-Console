'use client';

import { PostDemoLoginRequest } from '@/entities/user/api/contracts';
import { useLoginDemoMutation } from '@/entities/user/api/userApi';
import { demoRoles } from '@/entities/user/model/types';
import Button from '@/shared/ui/Button/Button';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const redirectByRole: Record<PostDemoLoginRequest['role'], string> = {
  manager: '/dashboard',
  reviewer: '/proposals',
  speaker: '/my-proposals',
};

const Login = () => {
  const router = useRouter();
  const [login] = useLoginDemoMutation();

  const handleDemoLogin = async (role: PostDemoLoginRequest['role']) => {
    try {
      const response = await login({ role }).unwrap();

      if (response.ok) {
        router.push(redirectByRole[role]);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack sx={{ p: 4 }}>
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        Авторизация с помощью Демо-роли:
      </Typography>
      <Stack spacing={3} sx={{ alignSelf: 'center' }}>
        {demoRoles.map((role) => (
          <Button
            key={role}
            mode="button"
            variant="contained"
            size="medium"
            onClick={() => handleDemoLogin(role)}
            sx={{ minWidth: 320 }}
          >
            Войти как {role}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default Login;
