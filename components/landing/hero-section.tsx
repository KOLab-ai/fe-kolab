"use client";

import { AnimatedSection } from "../animated-section";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();

  return (
    <AnimatedSection className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Find the{" "}
                <span className="text-gradient">Perfect Influencers</span> for
                Your Campaigns
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                KOLab.ai uses AI to match marketers with the most relevant Key
                Opinion Leaders for their product campaigns.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="px-8 transition-all duration-300 hover:scale-105 bg-gradient-brand rounded-full"
                onClick={() => router.push('/auth/login')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 transition-all duration-300 hover:border-primary rounded-full border-white/20 dark:border-gray-800/50"
                onClick={() => router.push("#features")}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl glassmorphism transition-all duration-700 hover:shadow-2xl transform hover:-rotate-1 animate-float">
              <img
                src="/images/kolab-ai-image-hero.png"
                alt="KOLab.ai platform preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
