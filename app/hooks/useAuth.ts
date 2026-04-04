'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';
import { api } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = isAuthenticated();
      const userData = getUser();

      if (auth && userData) {
        setUser(userData);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

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