import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import EngagementSection from "@/components/sections/EngagementSection";
import ControlSection from "@/components/sections/ControlSection";
import StatsSection from "@/components/sections/StatsSection";
import AudienceSection from "@/components/sections/AudienceSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <section id="hero">
        <HeroSection />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="how-it-works">
        <ControlSection />
      </section>
      <section id="engagement">
        <EngagementSection />
      </section>
      <StatsSection />
      <section id="audience">
        <AudienceSection />
      </section>
      <FAQSection />
      <section id="get-started">
        <CTASection />
      </section>
    </>
  );
}
