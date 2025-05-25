"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserRound, Users } from "lucide-react";

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

interface RoleSelectionProps {
  formData: FormData;
  updateFormData: (fieldName: keyof FormData, value: any) => void;
  setIsNextDisabled: (isDisabled: boolean) => void;
}

export function RoleSelection({
  formData,
  updateFormData,
  setIsNextDisabled,
}: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState(formData.role || "");

  useEffect(() => {
    // Enable the next button if a role is selected
    setIsNextDisabled(!selectedRole);
  }, [selectedRole, setIsNextDisabled]);

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    updateFormData("role", role);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
          Select Your Role
        </h1>
        <p className="text-muted-foreground">
          Let us know how you plan to use KOLab.ai so we can tailor your
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card
          className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
            selectedRole === "marketer"
              ? "border-primary bg-primary/5 shadow-md"
              : "hover:border-primary/50"
          }`}
          onClick={() => handleRoleClick("marketer")}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                selectedRole === "marketer"
                  ? "bg-gradient-to-r from-primary to-pink-500 text-white"
                  : "bg-muted"
              }`}
            >
              <UserRound size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Marketer / Brand</h3>
            <p className="text-muted-foreground">
              I want to find influencers for my marketing campaigns to promote
              products or services.
            </p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-not-allowed opacity-50 transition-all duration-300`}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-muted"
            >
              <Users size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Creator / Influencer</h3>
            <p className="text-muted-foreground">
              I'm a content creator looking to collaborate with brands that
              match my audience and style.
            </p>
            <p className="text-sm text-red-500 mt-2">Currently Unavailable</p>
          </CardContent>
        </Card>
      </div>

      <p className="text-sm text-center text-muted-foreground pt-4">
        You can change your role later in account settings if needed.
      </p>
    </div>
  );
}
