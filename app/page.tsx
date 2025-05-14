import { Headers } from "@/components/landing/headers";
import { HeroSection } from "@/components/landing/hero-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { BenefitSection } from "@/components/landing/benefit-section";
import { WorkSection } from "@/components/landing/work-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Headers />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeatureSection />

        {/* Benefits Section */}
        <BenefitSection />

        {/* How It Works Section */}
        <WorkSection/>

        {/* Testimonials Section */}
        <TestimonialSection/>

        {/* FAQ Section */}
        <FaqSection/>

        {/* CTA Section */}
        <CtaSection/>
        
      </main>

      <Footer/>
    </div>
  );
}
