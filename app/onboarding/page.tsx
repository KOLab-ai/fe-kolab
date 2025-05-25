"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Brain, Check, CheckCircle2, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { RoleSelection } from "@/components/onboarding/steps/role-selection";
import { ProfileDetails } from "@/components/onboarding/steps/profile-details";
import { CampaignGoals } from "@/components/onboarding/steps/campaign-goals";
import { TargetAudience } from "@/components/onboarding/steps/target-audience";
import { ProductCategory } from "@/components/onboarding/steps/product-category";
import { OnboardingComplete } from "@/components/onboarding/steps/onboarding-complete";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { getCookie } from "cookies-next";

// Define the steps in our onboarding process
const profileSteps = [
  "Role Selection",
  "Profile Details",
  "Complete",
];

const campaignSteps = [
  "Campaign Goals",
  "Target Audience",
  "Product Category",
  "Complete",
];

// Define the form data type
interface FormData {
  role: string;
  fullName: string;
  email: string;
  company: string;
  position: string;
  title: string;
  campaignGoals: string[];
  socialPlatforms: string[];
  budgetRange: string;
  timeline: string;
  targetAgeRange: string[];
  targetGender: string[];
  targetLocations: string[];
  targetInterests: string[];
  preferredPlatforms: string[];
  productCategory: string;
  productDescription: string;
}

// Formatting functions
function formatCampaignGoal(goalId: string): string {
  const goals: Record<string, string> = {
    "brand-awareness": "Increase Brand Awareness",
    "product-launch": "Product Launch",
    "content-creation": "Content Creation",
    "sales-conversion": "Sales Conversion",
    "social-engagement": "Social Media Engagement",
    "lead-generation": "Lead Generation",
  };
  return goals[goalId] || goalId;
}

function formatBudget(budgetId: string): string {
  const budgets: Record<string, string> = {
    "under-5k": "Under Rp5,000,000",
    "5k-10k": "Rp5,000,000 - Rp10,000,000",
    "10k-25k": "Rp10,000,000 - Rp25,000,000",
    "25k-50k": "Rp25,000,000 - Rp50,000,000",
    "over-50k": "Over Rp50,000,000",
  };
  return budgets[budgetId] || budgetId;
}

function formatCategory(categoryId: string): string {
  const categories: Record<string, string> = {
    "fashion": "Fashion & Apparel",
    "beauty": "Beauty & Personal Care",
    "technology": "Technology & Electronics",
    "food": "Food & Beverage",
    "health": "Health & Wellness",
    "travel": "Travel & Tourism",
    "lifestyle": "Lifestyle & Entertainment",
    "education": "Education & Learning",
    "finance": "Finance & Business",
    "sports": "Sports & Fitness",
    "home": "Home & Living",
    "automotive": "Automotive",
    "gaming": "Gaming & Entertainment",
    "other": "Other",
  };
  return categories[categoryId] || categoryId;
}

// Define the component props type
interface StepComponentProps {
  formData: FormData;
  updateFormData: (fieldName: keyof FormData, value: any) => void;
  setIsNextDisabled: (isDisabled: boolean) => void;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentFlow, setCurrentFlow] = useState<'profile' | 'campaign'>('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    role: "",
    fullName: "",
    email: "",
    company: "",
    position: "",
    title: "",
    campaignGoals: [],
    socialPlatforms: [],
    budgetRange: "",
    timeline: "",
    targetAgeRange: [],
    targetGender: [],
    targetLocations: [],
    targetInterests: [],
    preferredPlatforms: [],
    productCategory: "",
    productDescription: "",
  });

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  // Calculate progress percentage correctly based on the current step and flow
  const currentSteps = currentFlow === 'profile' ? profileSteps : campaignSteps;
  const progressPercentage = (currentStep / (currentSteps.length - 1)) * 100;

  // Use useCallback to prevent the function from being recreated on every render
  const updateFormData = useCallback((fieldName: keyof FormData, value: any) => {
    setFormData((prev) => {
      // Only update if the value has actually changed
      if (JSON.stringify(prev[fieldName]) === JSON.stringify(value)) {
        return prev;
      }
      return { ...prev, [fieldName]: value };
    });
  }, []);

  const createProfile = async () => {
    try {
      setIsSubmitting(true);
      
      // Prepare profile data
      const profileData = {
        role: formData.role,
        fullname: formData.fullName,
        email: formData.email,
        company: formData.company,
        position_title: formData.position,
      };

      // Make API call to create profile
      const response = await fetch(`${process.env.NEXT_PUBLIC_BE_API}/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('access_token')}`
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to create profile');
      }

      const data = await response.json();
      
      // Show success message
      toast({
        title: "Profile Created Successfully",
        description: "Your profile has been created. You can now proceed to create your campaign.",
      });

      // Proceed to campaign creation
      setCurrentFlow('campaign');
      setCurrentStep(0);
      setIsNextDisabled(true);
      window.scrollTo(0, 0);

    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error Creating Profile",
        description: "There was an error creating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const createCampaign = async () => {
    try {
      setIsCreatingCampaign(true);
      
      // Prepare campaign data with the new structure
      const campaignData = {
        title: formData.title,
        campaign_goals: formData.campaignGoals.map(goal => formatCampaignGoal(goal).toLowerCase()),
        social_platforms: formData.socialPlatforms,
        budget_range: formatBudget(formData.budgetRange),
        timeline: formData.timeline,
        target_age_range: formData.targetAgeRange.map(age => {
          const ageMap: Record<string, string> = {
            "13-17": "teenagers",
            "18-24": "young adults",
            "25-34": "millennials",
            "35-44": "gen x",
            "45-54": "baby boomers",
            "55+": "seniors"
          };
          return ageMap[age] || age;
        }),
        target_gender: formData.targetGender.map(gender => {
          const genderMap: Record<string, string> = {
            "male": "male",
            "female": "female",
            "non-binary": "non-binary",
            "all": "all genders"
          };
          return genderMap[gender] || gender;
        }),
        target_locations: formData.targetLocations,
        target_interests: formData.targetInterests,
        preferred_platforms: formData.preferredPlatforms.map(platform => {
          const platformMap: Record<string, string> = {
            "instagram": "instagram feed",
            "youtube": "youtube videos",
            "twitter": "twitter posts",
            "facebook": "facebook posts",
            "tiktok": "tiktok videos",
            "twitch": "twitch streams",
            "linkedin": "linkedin posts",
            "blog": "blog posts"
          };
          return platformMap[platform] || platform;
        }),
        product_category: formatCategory(formData.productCategory).toLowerCase(),
        product_description: formData.productDescription
      };

      // Make API call to create campaign
      const response = await fetch(`${process.env.NEXT_PUBLIC_BE_API}/campaigns/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('access_token')}`
        },
        body: JSON.stringify(campaignData),
      });

      if (!response.ok) {
        throw new Error('Failed to create campaign');
      }

      const data = await response.json();
      
      // Show success message
      toast({
        title: "Campaign Created Successfully",
        description: "Your campaign has been created. You can now proceed to the dashboard.",
      });

      // Redirect to dashboard
      window.location.href = '/dashboard';

    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error Creating Campaign",
        description: "There was an error creating your campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingCampaign(false);
    }
  };

  // Handle next button click
  const handleNext = () => {
    if (currentStep < currentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Reset the next button state for the new step
      setIsNextDisabled(currentStep + 1 === currentSteps.length - 1 ? false : true);
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    } else if (currentFlow === 'profile') {
      // If we're at the end of profile flow, switch to campaign flow
      setCurrentFlow('campaign');
      setCurrentStep(0);
      setIsNextDisabled(true);
      window.scrollTo(0, 0);
    }
  };

  // Handle back button click
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Reset the next button state for the new step
      setIsNextDisabled(false);
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    } else if (currentFlow === 'campaign') {
      // If we're at the start of campaign flow, go back to profile flow
      setCurrentFlow('profile');
      setCurrentStep(profileSteps.length - 1);
      setIsNextDisabled(false);
      window.scrollTo(0, 0);
    }
  };

  // Render the current step
  const renderStep = () => {
    if (currentFlow === 'profile') {
      switch (currentStep) {
        case 0:
          return (
            <RoleSelection
              formData={formData}
              updateFormData={updateFormData}
              setIsNextDisabled={setIsNextDisabled}
            />
          );
        case 1:
          return (
            <ProfileDetails
              formData={formData}
              updateFormData={updateFormData}
              setIsNextDisabled={setIsNextDisabled}
            />
          );
        case 2:
          return (
            <div className="flex flex-col items-center space-y-6 animate-in fade-in duration-500 py-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary/20 to-pink-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>

              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
                  Profile Created Successfully!
                </h1>
                <p className="text-muted-foreground">
                  Your profile has been set up. Now you can proceed to create your first campaign.
                </p>
              </div>

              <div className="border rounded-xl p-6 w-full bg-card shadow-sm mt-6 hover:shadow-md transition-all">
                <h2 className="font-semibold text-lg mb-4 text-primary">
                  Your Profile Summary
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Account Type
                    </h3>
                    <p className="text-base capitalize">{formData.role}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                    <p className="text-base">{formData.fullName}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Company
                    </h3>
                    <p className="text-base">{formData.company}</p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3 w-full">
                <p className="text-muted-foreground">
                  Ready to start your influencer marketing journey? Create your first campaign now!
                </p>
                <Button 
                  onClick={createProfile}
                  disabled={isSubmitting || isCreatingCampaign}
                  className="w-full md:w-auto rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Profile...
                    </>
                  ) : isCreatingCampaign ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Campaign...
                    </>
                  ) : (
                    <>
                      Create Campaign
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground pt-2">
                  You can update your profile anytime from settings.
                </p>
              </div>
            </div>
          );
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 0:
          return (
            <CampaignGoals
              formData={formData}
              updateFormData={updateFormData}
              setIsNextDisabled={setIsNextDisabled}
            />
          );
        case 1:
          return (
            <TargetAudience
              formData={formData}
              updateFormData={updateFormData}
              setIsNextDisabled={setIsNextDisabled}
            />
          );
        case 2:
          return (
            <ProductCategory
              formData={formData}
              updateFormData={updateFormData}
              setIsNextDisabled={setIsNextDisabled}
            />
          );
        case 3:
          return (
            <div className="flex flex-col items-center space-y-6 animate-in fade-in duration-500 py-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary/20 to-pink-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>

              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
                  Campaign Setup Complete!
                </h1>
                <p className="text-muted-foreground">
                  Your campaign has been set up. You can now proceed to the dashboard.
                </p>
              </div>

              <div className="border rounded-xl p-6 w-full bg-card shadow-sm mt-6 hover:shadow-md transition-all">
                <h2 className="font-semibold text-lg mb-4 text-primary">
                  Campaign Summary
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Campaign Goals
                    </h3>
                    <p className="text-base">
                      {formData.campaignGoals.map(goal => formatCampaignGoal(goal)).join(", ")}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Budget Range
                    </h3>
                    <p className="text-base">{formatBudget(formData.budgetRange)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Product Category
                    </h3>
                    <p className="text-base">{formatCategory(formData.productCategory)}</p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3 w-full">
                <Button 
                  onClick={createCampaign}
                  disabled={isSubmitting || isCreatingCampaign}
                  className="w-full md:w-auto rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90"
                >
                  {isCreatingCampaign ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Campaign...
                    </>
                  ) : (
                    <>
                      Create Campaign
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
              KOLab.ai
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container px-4 py-8 md:py-12">
        {/* Progress indicator */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Step {currentStep + 1} of {currentSteps.length - 1}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-primary">
                {currentFlow === 'profile' ? 'Profile Creation' : 'Campaign Setup'}
              </span>
              <span className="text-sm font-medium text-primary">
                {currentSteps[currentStep]}
              </span>
            </div>
          </div>
          <Progress
            value={progressPercentage}
            className="h-2 bg-muted"
            indicatorClassName="bg-gradient-to-r from-primary to-pink-500"
          />

          {/* Stepper */}
          <div className="hidden md:flex justify-between mt-4">
            {currentSteps.slice(0, -1).map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    index === currentStep
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : index < currentStep
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    index === currentStep
                      ? "text-primary font-medium"
                      : index < currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current step content */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8 transition-all duration-300 hover:shadow-md">
            {renderStep()}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 && currentFlow === 'profile'}
              className="transition-all duration-300 rounded-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`transition-all duration-300 rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 ${currentStep === currentSteps.length - 1 ? "hidden" : ""}`}
            >
              {currentStep === currentSteps.length - 2 ? "Complete" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {currentStep === currentSteps.length - 1 && (
              <Link href="/dashboard" passHref>
                <Button className="transition-all duration-300 rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
