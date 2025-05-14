import { CardContent } from "../ui/card";

import { CardDescription } from "../ui/card";

import { CardTitle } from "../ui/card";

import { CardHeader } from "../ui/card";

import { AnimatedCard } from "../animated-card";
import { AnimatedSection } from "../animated-section";
import { StaggeredChildren } from "../staggered-children";
import { BarChart3, Brain, Target, Users, Zap } from "lucide-react";

export function FeatureSection() {
  return (
    <AnimatedSection
      id="features"
      className="py-16 md:py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key <span className="text-gradient">Features</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our platform offers everything you need to find the perfect
              influencers for your campaigns.
            </p>
          </div>
        </div>
        <StaggeredChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>User Registration</CardTitle>
              <CardDescription>
                Simple registration with email or phone number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Create your account in seconds and start finding the perfect
                influencers for your campaigns.
              </p>
            </CardContent>
          </AnimatedCard>
          <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
            <CardHeader>
              <Target className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Smart Onboarding</CardTitle>
              <CardDescription>
                Define your campaign goals and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our intelligent onboarding process captures your specific needs
                to provide tailored recommendations.
              </p>
            </CardContent>
          </AnimatedCard>
          <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
            <CardHeader>
              <Brain className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>
                Get matched with the most relevant KOLs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our AI analyzes influencer profiles and content to find the
                perfect match for your brand and campaign.
              </p>
            </CardContent>
          </AnimatedCard>
          <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Influencer Lists</CardTitle>
              <CardDescription>
                Browse and filter KOLs by various criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Explore our extensive database of influencers with detailed
                profiles and performance metrics.
              </p>
            </CardContent>
          </AnimatedCard>
          <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
            <CardHeader>
              <BarChart3 className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Performance Tracking</CardTitle>
              <CardDescription>
                Monitor campaign results and ROI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Track the performance of your campaigns with comprehensive
                analytics and reporting tools.
              </p>
            </CardContent>
          </AnimatedCard>
          <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
            <CardHeader>
              <Zap className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Quick Revisions</CardTitle>
              <CardDescription>
                Easily update your campaign parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Change your requirements anytime and get updated recommendations
                instantly.
              </p>
            </CardContent>
          </AnimatedCard>
        </StaggeredChildren>
      </div>
    </AnimatedSection>
  );
}
