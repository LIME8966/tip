import React from 'react';
import { Layout } from '@/components/layout';
import {
  HeroSection,
  StatsSection,
  HiringTicker,
  VideoSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  FAQSection,
  CTASection
} from '@/components/landing';
import { DottedSurface } from '@/components/ui/dotted-surface';

const LandingPage = () => {
  return (
    <Layout>
      {/* 3D Dotted Surface Background */}
      <DottedSurface className="opacity-30" />
      
      <HeroSection />
      <StatsSection />
      <HiringTicker />
      <FeaturesSection />
      <VideoSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default LandingPage;
