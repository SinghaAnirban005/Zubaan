import { User } from './types';

export const handleAuthSuccess = (token: string, userData?: any) => {
  if (typeof window === "undefined") return;

  localStorage.setItem('token', token);

  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  return !!localStorage.getItem('token');
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem('user');

  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const logout = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};