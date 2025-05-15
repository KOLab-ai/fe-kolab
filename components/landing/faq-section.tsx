import { CardContent } from "../ui/card";

import { CardTitle } from "../ui/card";

import { CardHeader } from "../ui/card";

import { AnimatedCard } from "../animated-card";
import { AnimatedSection } from "../animated-section";
import { StaggeredChildren } from "../staggered-children";

export function FaqSection() {
  const faq = [
    {
      question: "How does KOLab.ai match marketers with influencers?",
      answer:
        "KOLab.ai uses advanced AI algorithms to analyze both marketer requirements and influencer profiles. The system considers factors like campaign goals, target audience demographics, product category, influencer content style, engagement rates, and audience authenticity to create optimal matches.",
    },
    {
      question: "Can I change my campaign parameters after setting them?",
      answer:
        "Yes, you can change your campaign parameters anytime. The system will automatically update the recommendations based on your new requirements.",
    },
    {
      question: "Is my data secure on KOLab.ai?",
      answer:
        "Absolutely. We take data security very seriously. All user data is encrypted and stored securely, and we implement robust protection against common security vulnerabilities. We never share your personal information with third parties without your explicit consent.",
    },
    {
      question: "How many users can the platform support?",
      answer:
        "KOLab.ai is built to scale. Our platform can handle at least 500 users per month initially, with the ability to scale horizontally to accommodate growth and usage spikes during large campaign launches.",
    },
  ];

  return (
    <AnimatedSection
      id="faq"
      className="py-16 md:py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Find answers to common questions about KOLab.ai.
            </p>
          </div>
        </div>
        <StaggeredChildren className="grid gap-6 mt-12 md:gap-8">
          {faq.map((faq) => (
            <AnimatedCard
              key={faq.question}
              className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10"
            >
              <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{faq.answer}</p>
              </CardContent>
            </AnimatedCard>
          ))}
        </StaggeredChildren>
      </div>
    </AnimatedSection>
  );
}
