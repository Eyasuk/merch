'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Routes } from 'utils/constants/routes';
import { userSessionService } from 'utils/services/authService';

interface AuthState {
  userLoggedIn: boolean;
  setUserLoggedIn(userLoggedIn: boolean): void;
}

const defaultAuthState: AuthState = {
  userLoggedIn: false,
  setUserLoggedIn: () => {},
};

const AuthContext = createContext(defaultAuthState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const router = useRouter();
  const currentPath = usePathname();

  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  const redirectTo = async (path: string): Promise<void> => {
    const userSession = await userSessionService();
    setUserLoggedIn(userSession);
    if (
      userSession &&
      Object.values(Routes.authenticationRoutes).includes(path)
    ) {
      router.push('/');
      return;
    }

    if (!userSession) {
      router.push('/signin');
      return;
    }
  };

  useEffect(() => {
    redirectTo(currentPath ?? '/');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn,
        setUserLoggedIn,
      }}
    >
      {children}{' '}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
