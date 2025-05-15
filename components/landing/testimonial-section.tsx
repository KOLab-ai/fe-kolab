import { CardHeader } from "../ui/card";

import { AnimatedCard } from "../animated-card";
import { AnimatedSection } from "../animated-section";
import { StaggeredChildren } from "../staggered-children";
import { CardTitle } from "../ui/card";
import { CardDescription } from "../ui/card";
import { CardContent } from "../ui/card";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      testimonial:
        "KOLab.ai helped us find the perfect influencers for our product launch. The AI recommendations were spot-on, and we saw a 40% increase in engagement compared to our previous campaigns.",
    },
    {
      name: "Michael Chen",
      role: "Brand Manager",
      testimonial:
        "The platform is incredibly intuitive and the recommendations are tailored perfectly to our brand values. We've found influencers who truly understand our products.",
    },
    {
      name: "Priya Patel",
      role: "Digital Marketing Lead",
      testimonial:
        "KOLab.ai has transformed how we approach influencer marketing. The AI recommendations have saved us countless hours of research and improved our campaign ROI significantly.",
    },
  ];

  return (
    <AnimatedSection className="py-16 md:py-24 bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our <span className="text-gradient">Users</span> Say
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Hear from marketers who have found success with KOLab.ai.
            </p>
          </div>
        </div>
        <StaggeredChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial) => (
            <AnimatedCard
              key={testimonial.name}
              className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10 relative overflow-hidden"
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 text-primary/20 rotate-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M11.3 3.3c-.2-.2-.5-.3-.7-.3s-.5.1-.7.3L3.3 9.9c-.2.2-.3.4-.3.7s.1.5.3.7l6.6 6.6c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.4 10.6l6.6-6.6c.3-.4.3-1.1-.1-1.4z" />
                  <path d="M20.3 9.9l-6.6-6.6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l6.6 6.6-6.6 6.6c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l6.6-6.6c.2-.2.3-.4.3-.7s-.1-.5-.3-.7z" />
                </svg>
              </div>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="User avatar"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">{`"${testimonial.testimonial}"`}</p>
              </CardContent>
            </AnimatedCard>
          ))}
        </StaggeredChildren>
      </div>
    </AnimatedSection>
  );
}
