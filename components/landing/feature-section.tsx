import { CardContent } from "../ui/card";

import { CardDescription } from "../ui/card";

import { CardTitle } from "../ui/card";

import { CardHeader } from "../ui/card";

import { AnimatedCard } from "../animated-card";
import { AnimatedSection } from "../animated-section";
import { StaggeredChildren } from "../staggered-children";
import { BarChart3, Brain, History, Target, Users, Zap } from "lucide-react";
import { Badge } from "../ui/badge";

const features = [
  // {
  //   icon: Users,
  //   title: "User Registration",
  //   description: "Simple registration with email or phone number",
  //   content: "Create your account in seconds and start finding the perfect influencers for your campaigns.",
  //   isNextFeature: false,
  // },
  {
    icon: Target,
    title: "Smart Onboarding",
    description: "Define your campaign goals and requirements",
    content:
      "Our intelligent onboarding process captures your specific needs to provide tailored recommendations.",
    isNextFeature: false,
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Get matched with the most relevant KOLs",
    content:
      "Our AI analyzes influencer profiles and content to find the perfect match for your brand and campaign.",
    isNextFeature: false,
  },
  {
    icon: Users,
    title: "Influencer Lists",
    description: "Browse and filter KOLs by various criteria",
    content:
      "Explore our extensive database of influencers with detailed profiles and performance metrics.",
    isNextFeature: false,
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Monitor campaign results and ROI",
    content:
      "Track the performance of your campaigns with comprehensive analytics and reporting tools.",
    isNextFeature: true,
  },
  {
    icon: Zap,
    title: "Quick Revisions",
    description: "Easily update your campaign parameters",
    content:
      "Change your requirements anytime and get updated recommendations instantly.",
    isNextFeature: false,
  },
  {
    icon: History,
    title: "History of Campaigns",
    description: "View the history of your campaigns",
    content: "Track the history of your campaigns and see the results.",
    isNextFeature: false,
  },
];

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
          {features.map((feature) => (
            <AnimatedCard
              key={feature.title}
              className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10"
            >
              <CardHeader>
                <feature.icon className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                {feature.isNextFeature && (
                  <Badge className="absolute top-2 right-2 h-5 w-auto p-2 m-0 flex items-center justify-center bg-primary">
                    Next Feature
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <p>{feature.content}</p>
              </CardContent>
            </AnimatedCard>
          ))}
        </StaggeredChildren>
      </div>
    </AnimatedSection>
  );
}
