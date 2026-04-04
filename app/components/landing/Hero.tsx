'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import { Sparkles, PlayCircle } from "lucide-react"

interface HeroProps {
  onGetStarted?: () => void;
  isAuthenticated?: boolean;
}

export function Hero({ onGetStarted, isAuthenticated }: HeroProps) {
  const router = useRouter();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else if (onGetStarted) {
      onGetStarted();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass-effect rounded-full px-4 py-2 mb-8"
        >
          <Sparkles className="text-orange-400 w-4 h-4" />
          <span className="text-sm font-medium text-gray-300">AI-Powered · Hinglish First</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          Generate{' '}
          <span className="text-gradient bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text">
            Hinglish
          </span>
          <br />
          <span className="text-white">Subtitles Instantly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mt-6"
        >
          Create accurate, context aware subtitles for your videos mixing Hindi & English,
          exactly the way India speaks. 98% accuracy, blazing fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <Button variant="primary" size="lg" icon={<Sparkles />} onClick={handleGetStarted}>
            {isAuthenticated ? 'Go to Dashboard' : 'Start Generating Free'}
          </Button>
          <Button variant="outline" size="lg" icon={<PlayCircle />}>
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {[
            { label: 'Languages Supported', value: '2+' },
            { label: 'Free Hours/Month', value: '10 hrs' },
            { label: 'Accuracy Rate', value: '98%' },
            { label: 'Happy Creators', value: '10K+' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-bold text-orange-500">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}