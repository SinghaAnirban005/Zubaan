'use client';

import { Navbar } from "./components/landing/Navbar"
import { Hero } from "./components/landing/Hero"
import { Features } from "./components/landing/Features"
import { HowItWorks } from "./components/landing/HowItWorks"
import { DemoSection } from "./components/landing/Demo"
import { Pricing } from "./components/landing/Pricing"
import { Footer } from "./components/landing/Footer"

import { useAuth } from '@/app/hooks/useAuth';

export default function Home() {
  const { user, loginWithGoogle } = useAuth();

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero onGetStarted={loginWithGoogle} isAuthenticated={!!user} />
      <Features />
      <HowItWorks />
      <DemoSection />
      <Pricing />
      <Footer />
    </main>
  );
}