'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Languages,  
  Home
} from 'lucide-react'; 

import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { useAuth } from '@/app/hooks/useAuth';

export default function SignUpPage() {
  const router = useRouter();
  const { user, loginWithGoogle, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && !authLoading) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google sign-up error:', error);
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      router.push('/auth/signin');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
            <h1 className="text-2xl font-bold mb-2 text-white">Create an account</h1>
            <p className="text-gray-400 text-sm">
              Start generating Hinglish subtitles for free
            </p>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full relative border-zinc-800 hover:bg-zinc-900 text-zinc-300 cursor-pointer"
              onClick={handleGoogleSignUp}
              loading={isLoading}
              disabled={isLoading}
            >
              <Home className="w-5 h-5 mr-2 text-orange-500" />
              Sign up with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/auth/signin')}
                className="text-orange-500 hover:text-orange-400 font-medium transition-colors cursor-pointer"
              >
                Sign in
              </button>
            </p>
          </div>

          <p className="text-xs text-gray-500 text-center mt-8 leading-relaxed">
            By signing up, you agree to our{' '}
            <a href="#" className="text-orange-500 hover:text-orange-400 underline-offset-4 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-orange-500 hover:text-orange-400 underline-offset-4 hover:underline">Privacy Policy</a>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}