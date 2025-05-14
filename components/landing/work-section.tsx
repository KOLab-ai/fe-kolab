import { CardContent } from "../ui/card";

import { CardTitle } from "../ui/card";

import { CardHeader } from "../ui/card";

import { AnimatedCard } from "../animated-card";

import { AnimatedSection } from "../animated-section";
import { StaggeredChildren } from "../staggered-children";

export function WorkSection() {
  return (
    <AnimatedSection
          id="how-it-works"
          className="py-16 md:py-24 bg-background relative overflow-hidden"
        >
          <div className="absolute inset-0 grid-pattern opacity-20"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It <span className="text-gradient">Works</span>
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Finding the perfect influencers for your campaign is simple
                  with KOLab.ai.
                </p>
              </div>
            </div>
            <StaggeredChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-brand opacity-10 rounded-bl-full"></div>
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-brand text-white mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <CardTitle>Create Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Sign up with your email or phone number and select your role
                    as a marketer.
                  </p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-brand opacity-10 rounded-bl-full"></div>
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-brand text-white mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <CardTitle>Complete Onboarding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Tell us about your campaign goals, target audience, and
                    product category.
                  </p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-brand opacity-10 rounded-bl-full"></div>
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-brand text-white mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <CardTitle>Get Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Receive AI-powered recommendations of the most suitable
                    influencers for your campaign.
                  </p>
                </CardContent>
              </AnimatedCard>
            </StaggeredChildren>
          </div>
        </AnimatedSection>
  )
}

