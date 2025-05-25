"use client";

import type React from "react";

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormData {
  role: string;
  fullName: string;
  email: string;
  company: string;
  position: string;
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

interface ProfileDetailsProps {
  formData: FormData;
  updateFormData: (fieldName: keyof FormData, value: any) => void;
  setIsNextDisabled: (isDisabled: boolean) => void;
}

export function ProfileDetails({
  formData,
  updateFormData,
  setIsNextDisabled,
}: ProfileDetailsProps) {
  // Check if form is valid
  const validateForm = () => {
    const { fullName, email, company } = formData;
    const isValid = fullName && email && company && email.includes("@");
    setIsNextDisabled(!isValid);
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData(e.target.name as keyof FormData, e.target.value);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
          Profile Details
        </h1>
        <p className="text-muted-foreground">
          Tell us a bit about yourself so we can personalize your experience.
        </p>
      </div>

      <form className="space-y-4 mt-8">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName || ""}
              onChange={handleChange}
              className="transition-all duration-200 focus-visible:ring-primary rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email || ""}
              onChange={handleChange}
              className="transition-all duration-200 focus-visible:ring-primary rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company / Organization</Label>
            <Input
              id="company"
              name="company"
              placeholder="Enter your company name"
              value={formData.company || ""}
              onChange={handleChange}
              className="transition-all duration-200 focus-visible:ring-primary rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position / Job Title</Label>
            <Input
              id="position"
              name="position"
              placeholder="Enter your position (optional)"
              value={formData.position || ""}
              onChange={handleChange}
              className="transition-all duration-200 focus-visible:ring-primary rounded-lg"
            />
          </div>
        </div>
      </form>

      <p className="text-sm text-center text-muted-foreground pt-4">
        Your information is secure and will never be shared without your
        permission.
      </p>
    </div>
  );
}
