'use client';

import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { User } from './types';

type AuthContextValue = {
  user: User;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = PropsWithChildren<{
  initialUser: User;
}>;

export const AuthProvider: React.FC<AuthProviderProps> = ({
  initialUser,
  children,
}) => {
  const value = useMemo<AuthContextValue>(
    () => ({
      user: initialUser,
    }),
    [initialUser],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth Должен использоваться внутри AuthProvider');
  }

  return context;
};
