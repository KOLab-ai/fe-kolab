import { ShieldCheck, Smartphone, Users } from "lucide-react";
import { Star } from "lucide-react";
import { AnimatedSection } from "../animated-section";
import { StaggeredChildren } from "../staggered-children";

export function BenefitSection() {
  return (
    <AnimatedSection
      id="benefits"
      className="py-16 md:py-24 bg-muted/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose <span className="text-gradient">KOLab.ai</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our platform offers unique advantages to help you succeed with
              influencer marketing.
            </p>
          </div>
        </div>
        <StaggeredChildren className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-background/50 glassmorphism">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Star className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Tailored Recommendations</h3>
              <p className="text-muted-foreground mt-2">
                Get influencer recommendations that perfectly match your
                campaign goals and target audience.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-background/50 glassmorphism">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Personalized Profiles</h3>
              <p className="text-muted-foreground mt-2">
                Create detailed profiles that help our AI understand your
                specific needs and preferences.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-background/50 glassmorphism">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Data Security</h3>
              <p className="text-muted-foreground mt-2">
                Your data is encrypted and stored securely, with robust
                protection against vulnerabilities.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-background/50 glassmorphism">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Responsive Design</h3>
              <p className="text-muted-foreground mt-2">
                Access the platform from any device with our user-friendly,
                responsive interface.
              </p>
            </div>
          </div>
        </StaggeredChildren>
      </div>
    </AnimatedSection>
  );
}
