import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, BarChart3, Brain, ShieldCheck, Smartphone, Zap, Star } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedSection } from "@/components/animated-section"
import { StaggeredChildren } from "@/components/staggered-children"
import { AnimatedCard } from "@/components/animated-card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full glassmorphism backdrop-blur-lg border-b border-white/10 dark:border-gray-800/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gradient">KOLab.ai</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors duration-200">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors duration-200">
              Benefits
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              How It Works
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors duration-200">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="transition-all duration-300 hover:border-primary rounded-full border-white/20 dark:border-gray-800/50"
            >
              Log in
            </Button>
            <Button
              size="sm"
              className="transition-all duration-300 hover:opacity-90 hover:scale-105 bg-gradient-brand rounded-full"
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <AnimatedSection className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Find the <span className="text-gradient">Perfect Influencers</span> for Your Campaigns
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    KOLab.ai uses AI to match marketers with the most relevant Key Opinion Leaders for their product
                    campaigns.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="px-8 transition-all duration-300 hover:scale-105 bg-gradient-brand rounded-full"
                  >
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 transition-all duration-300 hover:border-primary rounded-full border-white/20 dark:border-gray-800/50"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl glassmorphism transition-all duration-700 hover:shadow-2xl transform hover:-rotate-1 animate-float">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="KOLab.ai platform preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection id="features" className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Key <span className="text-gradient">Features</span>
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform offers everything you need to find the perfect influencers for your campaigns.
                </p>
              </div>
            </div>
            <StaggeredChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <Users className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>User Registration</CardTitle>
                  <CardDescription>Simple registration with email or phone number</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Create your account in seconds and start finding the perfect influencers for your campaigns.</p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <Target className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Smart Onboarding</CardTitle>
                  <CardDescription>Define your campaign goals and requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our intelligent onboarding process captures your specific needs to provide tailored recommendations.
                  </p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <Brain className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>Get matched with the most relevant KOLs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our AI analyzes influencer profiles and content to find the perfect match for your brand and
                    campaign.
                  </p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <Users className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Influencer Lists</CardTitle>
                  <CardDescription>Browse and filter KOLs by various criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Explore our extensive database of influencers with detailed profiles and performance metrics.</p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <BarChart3 className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Performance Tracking</CardTitle>
                  <CardDescription>Monitor campaign results and ROI</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Track the performance of your campaigns with comprehensive analytics and reporting tools.</p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Quick Revisions</CardTitle>
                  <CardDescription>Easily update your campaign parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Change your requirements anytime and get updated recommendations instantly.</p>
                </CardContent>
              </AnimatedCard>
            </StaggeredChildren>
          </div>
        </AnimatedSection>

        {/* Benefits Section */}
        <AnimatedSection id="benefits" className="py-16 md:py-24 bg-muted/50 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose <span className="text-gradient">KOLab.ai</span>
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform offers unique advantages to help you succeed with influencer marketing.
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
                    Get influencer recommendations that perfectly match your campaign goals and target audience.
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
                    Create detailed profiles that help our AI understand your specific needs and preferences.
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
                    Your data is encrypted and stored securely, with robust protection against vulnerabilities.
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
                    Access the platform from any device with our user-friendly, responsive interface.
                  </p>
                </div>
              </div>
            </StaggeredChildren>
          </div>
        </AnimatedSection>

        {/* How It Works Section */}
        <AnimatedSection id="how-it-works" className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It <span className="text-gradient">Works</span>
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Finding the perfect influencers for your campaign is simple with KOLab.ai.
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
                  <p>Sign up with your email or phone number and select your role as a marketer.</p>
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
                  <p>Tell us about your campaign goals, target audience, and product category.</p>
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
                  <p>Receive AI-powered recommendations of the most suitable influencers for your campaign.</p>
                </CardContent>
              </AnimatedCard>
            </StaggeredChildren>
          </div>
        </AnimatedSection>

        {/* Testimonials Section */}
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
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10 relative overflow-hidden">
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
                      <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                      <CardDescription>Marketing Director</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">
                    "KOLab.ai helped us find the perfect influencers for our product launch. The AI recommendations were
                    spot-on, and we saw a 40% increase in engagement compared to our previous campaigns."
                  </p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10 relative overflow-hidden">
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
                      <CardTitle className="text-lg">Michael Chen</CardTitle>
                      <CardDescription>Brand Manager</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">
                    "The platform is incredibly intuitive and the recommendations are tailored perfectly to our brand
                    values. We've found influencers who truly understand our products."
                  </p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10 relative overflow-hidden">
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
                      <CardTitle className="text-lg">Priya Patel</CardTitle>
                      <CardDescription>Digital Marketing Lead</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">
                    "KOLab.ai has transformed how we approach influencer marketing. The AI recommendations have saved us
                    countless hours of research and improved our campaign ROI significantly."
                  </p>
                </CardContent>
              </AnimatedCard>
            </StaggeredChildren>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection id="faq" className="py-16 md:py-24 bg-background relative overflow-hidden">
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
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>How does KOLab.ai match marketers with influencers?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    KOLab.ai uses advanced AI algorithms to analyze both marketer requirements and influencer profiles.
                    The system considers factors like campaign goals, target audience demographics, product category,
                    influencer content style, engagement rates, and audience authenticity to create optimal matches.
                  </p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Can I change my campaign parameters after setting them?</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Is my data secure on KOLab.ai?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Absolutely. We take data security very seriously. All user data is encrypted and stored securely,
                    and we implement robust protection against common security vulnerabilities. We never share your
                    personal information with third parties without your explicit consent.
                  </p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard className="glassmorphism border-white/10 dark:border-gray-800/50 hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>How many users can the platform support?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    KOLab.ai is built to scale. Our platform can handle at least 500 users per month initially, with the
                    ability to scale horizontally to accommodate growth and usage spikes during large campaign launches.
                  </p>
                </CardContent>
              </AnimatedCard>
            </StaggeredChildren>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="py-16 md:py-24 bg-gradient-brand text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_40%_60%,rgba(0,0,0,0.1),transparent_50%),radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Find Your Perfect Influencers?
                </h2>
                <p className="max-w-[700px] md:text-xl">
                  Join KOLab.ai today and transform your influencer marketing strategy.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 transition-all duration-300 hover:scale-105 rounded-full bg-white text-primary"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent border-white text-white hover:bg-white/10 transition-all duration-300 rounded-full"
                >
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t bg-muted/50 border-white/10 dark:border-gray-800/50">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-gradient">KOLab.ai</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered influencer matching for successful marketing campaigns.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    For Marketers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    For Influencers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground border-white/10 dark:border-gray-800/50">
            <p>© 2025 KOLab.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
