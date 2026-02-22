import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatsSection from '@/components/sections/StatsSection';
import AudienceSection from '@/components/sections/AudienceSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen ">
        <HeroSection />
        <FeaturesSection />
        {/* <HowItWorksSection /> */}
        <ExperienceSection />
        <StatsSection />
        <AudienceSection />
        <CTASection />
      </main>
    </>
  );
}
