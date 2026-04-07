import { Suspense } from 'react';
import AuthSuccessClient from './AuthSuccessClient';
import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner';

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-black">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-400">Processing authentication...</p>
        </div>
      }
    >
      <AuthSuccessClient />
    </Suspense>
  );
}