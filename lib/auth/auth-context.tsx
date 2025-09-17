'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, UserRole, AuthContextType, LoginCredentials } from '@/types/auth';
import { validateCredentials } from './mock-data';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem('betterflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const validatedUser = validateCredentials(credentials.email, credentials.password);

    if (!validatedUser) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }

    validatedUser.lastLogin = new Date();

    setUser(validatedUser);

    if (credentials.rememberMe) {
      localStorage.setItem('betterflow_user', JSON.stringify(validatedUser));
    } else {
      sessionStorage.setItem('betterflow_user', JSON.stringify(validatedUser));
    }

    setIsLoading(false);

    // Redirect based on user role
    if (validatedUser.role === 'client') {
      router.push('/client-portal');
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('betterflow_user');
    sessionStorage.removeItem('betterflow_user');
    router.push('/login');
  }, [router]);

  const canAccess = useCallback((allowedRoles: UserRole[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    canAccess
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: UserRole[]
) {
  return function ProtectedRoute(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push('/login');
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9152DE]"></div>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    if (!allowedRoles.includes(user.role)) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}