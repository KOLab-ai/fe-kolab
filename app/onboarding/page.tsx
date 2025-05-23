"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Brain, Check } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { RoleSelection } from "@/components/onboarding/steps/role-selection";
import { ProfileDetails } from "@/components/onboarding/steps/profile-details";
import { CampaignGoals } from "@/components/onboarding/steps/campaign-goals";
import { TargetAudience } from "@/components/onboarding/steps/target-audience";
import { ProductCategory } from "@/components/onboarding/steps/product-category";
import { OnboardingComplete } from "@/components/onboarding/steps/onboarding-complete";
import Link from "next/link";

// Define the steps in our onboarding process
const steps = [
  "Role Selection",
  "Profile Details",
  "Campaign Goals",
  "Target Audience",
  "Product Category",
  "Complete",
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  // Update the formData state to include social media platforms
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    email: "",
    company: "",
    position: "",
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

  // Calculate progress percentage correctly based on the current step
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  // Use useCallback to prevent the function from being recreated on every render
  const updateFormData = useCallback((fieldName: string, value: any) => {
    setFormData((prev) => {
      // Only update if the value has actually changed
      if (JSON.stringify(prev[fieldName]) === JSON.stringify(value)) {
        return prev;
      }
      return { ...prev, [fieldName]: value };
    });
  }, []);

  // Handle next button click
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Reset the next button state for the new step
      setIsNextDisabled(currentStep + 1 === steps.length - 1 ? false : true);
      // Scroll to top when changing steps
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
    }
  };

  // Render the current step
  const renderStep = () => {
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
          <CampaignGoals
            formData={formData}
            updateFormData={updateFormData}
            setIsNextDisabled={setIsNextDisabled}
          />
        );
      case 3:
        return (
          <TargetAudience
            formData={formData}
            updateFormData={updateFormData}
            setIsNextDisabled={setIsNextDisabled}
          />
        );
      case 4:
        return (
          <ProductCategory
            formData={formData}
            updateFormData={updateFormData}
            setIsNextDisabled={setIsNextDisabled}
          />
        );
      case 5:
        return <OnboardingComplete formData={formData} />;
      default:
        return null;
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
              Step {currentStep + 1} of {steps.length - 1}
            </h2>
            <span className="text-sm font-medium text-primary">
              {steps[currentStep]}
            </span>
          </div>
          <Progress
            value={progressPercentage}
            className="h-2 bg-muted"
            indicatorClassName="bg-gradient-to-r from-primary to-pink-500"
          />

          {/* Stepper */}
          <div className="hidden md:flex justify-between mt-4">
            {steps.slice(0, -1).map((step, index) => (
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
              disabled={currentStep === 0}
              className="transition-all duration-300 rounded-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`transition-all duration-300 rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 ${currentStep === steps.length - 1 ? "hidden" : ""}`}
            >
              {currentStep === steps.length - 2 ? "Complete" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {currentStep === steps.length - 1 && (
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
