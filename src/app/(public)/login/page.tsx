'use client';

import { PostDemoLoginRequest } from '@/entities/user/api/contracts';
import { useLoginDemoMutation } from '@/entities/user/api/userApi';
import { demoRoles } from '@/entities/user/model/types';
import Button from '@/shared/ui/Button/Button';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { styles } from './styles';
import { useAppDispatch } from '@/shared/store/hooks';
import { baseApi } from '@/shared/api/baseApi';

const redirectByRole: Record<PostDemoLoginRequest['role'], string> = {
  manager: '/dashboard',
  reviewer: '/proposals',
  speaker: '/my-proposals',
};

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login] = useLoginDemoMutation();

  const sx = styles();

  const handleDemoLogin = async (role: PostDemoLoginRequest['role']) => {
    try {
      const response = await login({ role }).unwrap();

      if (response.ok) {
        dispatch(baseApi.util.resetApiState());

        router.push(redirectByRole[role]);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack sx={sx.login}>
      <Typography variant="h1" sx={sx.loginTitle}>
        Авторизация с помощью Демо-роли:
      </Typography>
      <Stack spacing={3} sx={sx.loginActions}>
        {demoRoles.map((role) => (
          <Button
            key={role}
            mode="button"
            variant="contained"
            size="medium"
            onClick={() => handleDemoLogin(role)}
            sx={sx.loginButton}
          >
            Войти как {role}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default Login;
