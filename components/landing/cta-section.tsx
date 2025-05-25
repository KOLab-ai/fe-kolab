"use client";

import { AnimatedSection } from "../animated-section";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function CtaSection() {
  const router = useRouter();

  return (
    <AnimatedSection className="py-16 md:py-24 bg-gradient-brand text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_40%_60%,rgba(0,0,0,0.1),transparent_50%),radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col space-y-2 justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Find Your Perfect Influencers?
            </h2>
            <p className="w-full md:text-xl">
              Join KOLab.ai today and transform your influencer marketing
              strategy.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 transition-all duration-300 hover:scale-105 rounded-full bg-white text-primary hover:text-white"
              onClick={() => router.push('/auth/login')}
            >
              Get Started
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="px-8 bg-transparent border-white text-white hover:bg-white/10 transition-all duration-300 rounded-full"
            >
              Request Demo
            </Button> */}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
