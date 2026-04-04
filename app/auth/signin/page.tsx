'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Languages, Home } from 'lucide-react'; 

import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { useAuth } from '@/app/hooks/useAuth';

export default function SignInPage() {
  const router = useRouter();
  const { user, loginWithGoogle, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !authLoading) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl animate-pulse-slow" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8 border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Languages className="text-white w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">Welcome back</h1>
            <p className="text-gray-400 text-sm">
              Sign in to generate Hinglish subtitles for your videos
            </p>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full relative border-zinc-800 hover:bg-zinc-900 text-zinc-300 cursor-pointer"
              onClick={handleGoogleSignIn}
              loading={isLoading}
              disabled={isLoading}
            >
              <Home className="w-5 h-5 mr-2 text-orange-500" />
              Continue with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/auth/signup')}
                className="text-orange-500 hover:text-orange-400 font-medium transition-colors cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>

          <p className="text-xs text-gray-500 text-center mt-8">
            By continuing, you agree to our{' '}
            <a href="#" className="text-orange-500 hover:text-orange-400">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-orange-500 hover:text-orange-400">Privacy Policy</a>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}