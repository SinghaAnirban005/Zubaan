'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleAuthSuccess } from '@/lib/auth';
import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner';

export default function AuthSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get('token');

      if (token) {
        try {
          handleAuthSuccess(token);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('user', JSON.stringify(userData.data));
          }

          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } catch (err) {
          console.error('Auth error:', err);
          setError('Authentication failed. Please try again.');

          setTimeout(() => {
            router.push('/auth/signin');
          }, 3000);
        }
      } else {
        setError('No authentication token found');

        setTimeout(() => {
          router.push('/auth/signin');
        }, 3000);
      }
    };

    handleAuth();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <p className="text-gray-400">Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-400">
        Authentication successful! Redirecting to dashboard...
      </p>
    </div>
  );
}