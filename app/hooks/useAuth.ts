'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';
import { api } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = () => {
    const auth = isAuthenticated();
    const userData = getUser();

    if (auth && userData) {
      setUser(userData);
      setAuthenticated(true);
    } else {
      setUser(null);
      setAuthenticated(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuth();

    window.addEventListener('focus', checkAuth);
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('focus', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await api.logout();
      setUser(null);
      setAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    window.location.href = `${apiUrl}/auth/google`;
  };

  return {
    user,
    loading,
    isAuthenticated: authenticated,
    logout: handleLogout,
    loginWithGoogle: handleGoogleLogin,
  };
}