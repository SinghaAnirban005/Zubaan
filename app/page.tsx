import Navbar from "./components/landing/Navbar"
import HeroSection from "./components/landing/HeroSection";
import FeaturesSection from "./components/landing/FeaturesSelection";
import HowItWorksSection from "./components/landing/HowItWorksSection";
import Footer from "./components/landing/Footer";
import CTASection from "./components/landing/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}