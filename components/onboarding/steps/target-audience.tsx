"use client";

import { Button } from "@/components/ui/button";
import type React from "react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  X,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  TwitterIcon,
  Twitch,
  Linkedin,
  Globe,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCookie } from "cookies-next";

interface Location {
  id: string;
  city: string;
}

interface Interest {
  id: string;
  name: string;
}

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

interface TargetAudienceProps {
  formData: FormData;
  updateFormData: (fieldName: keyof FormData, value: any) => void;
  setIsNextDisabled: (isDisabled: boolean) => void;
}

export function TargetAudience({
  formData,
  updateFormData,
  setIsNextDisabled,
}: TargetAudienceProps) {
  // Consolidated state object to prevent circular dependencies
  const [state, setState] = useState({
    ageRanges: formData.targetAgeRange || [],
    genders: formData.targetGender || [],
    locations: formData.targetLocations || [],
    interests: formData.targetInterests || [],
    preferredPlatforms: formData.preferredPlatforms || [],
  });

  // State for API data
  const [locations, setLocations] = useState<Location[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch locations and interests from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [locationsRes, interestsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BE_API}/domiciles/`, {
            headers: {
              'Authorization': `Bearer ${getCookie('access_token')}`
            }
          }),
          fetch(`${process.env.NEXT_PUBLIC_BE_API}/categories/`, {
            headers: {
              'Authorization': `Bearer ${getCookie('access_token')}`
            }
          })
        ]);

        if (!locationsRes.ok || !interestsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [locationsData, interestsData] = await Promise.all([
          locationsRes.json(),
          interestsRes.json()
        ]);

        setLocations(locationsData);
        setInterests(interestsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const ageRangeOptions = [
    { id: "13-17", label: "13-17" },
    { id: "18-24", label: "18-24" },
    { id: "25-34", label: "25-34" },
    { id: "35-44", label: "35-44" },
    { id: "45-54", label: "45-54" },
    { id: "55+", label: "55+" },
  ];

  const genderOptions = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "all", label: "All genders" },
  ];

  const socialPlatforms = [
    { value: "instagram", label: "Instagram", icon: Instagram },
    { value: "youtube", label: "YouTube", icon: Youtube },
    { value: "twitter", label: "Twitter", icon: Twitter },
    { value: "facebook", label: "Facebook", icon: Facebook },
    { value: "tiktok", label: "TikTok", icon: TwitterIcon },
  ];

  // Single useEffect to update parent form data and check validity
  useEffect(() => {
    // Only update parent form data when our local state changes
    updateFormData("targetAgeRange", state.ageRanges);
    updateFormData("targetGender", state.genders);
    updateFormData("targetLocations", state.locations);
    updateFormData("targetInterests", state.interests);
    updateFormData("preferredPlatforms", state.preferredPlatforms);

    // Check if form is valid
    const isValid = state.ageRanges.length > 0 && state.genders.length > 0;
    setIsNextDisabled(!isValid);
  }, [state, updateFormData, setIsNextDisabled]);

  // Single function to update state
  const updateState = (newState: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  // Handle age range selection
  const handleAgeRangeChange = (rangeId: string, checked: boolean) => {
    if (checked) {
      updateState({ ageRanges: [...state.ageRanges, rangeId] });
    } else {
      updateState({
        ageRanges: state.ageRanges.filter((id) => id !== rangeId),
      });
    }
  };

  // Handle gender selection
  const handleGenderChange = (genderId: string, checked: boolean) => {
    if (checked) {
      // If "all genders" is selected, only select that one
      if (genderId === "all") {
        updateState({ genders: ["all"] });
      } else {
        // If a specific gender is selected, remove "all genders" if it's there
        const newGenders = [
          ...state.genders.filter((id) => id !== "all"),
          genderId,
        ];
        updateState({ genders: newGenders });
      }
    } else {
      updateState({ genders: state.genders.filter((id) => id !== genderId) });
    }
  };

  // Handle location selection
  const handleLocationChange = (locationId: string) => {
    if (!state.locations.includes(locationId)) {
      updateState({ locations: [...state.locations, locationId] });
    }
  };

  const handleRemoveLocation = (locationId: string) => {
    updateState({ locations: state.locations.filter((id) => id !== locationId) });
  };

  // Handle interest selection
  const handleInterestChange = (interestId: string) => {
    if (!state.interests.includes(interestId)) {
      updateState({ interests: [...state.interests, interestId] });
    }
  };

  const handleRemoveInterest = (interestId: string) => {
    updateState({ interests: state.interests.filter((id) => id !== interestId) });
  };

  // Handle platform selection
  const togglePlatform = (platform: string) => {
    if (state.preferredPlatforms.includes(platform)) {
      updateState({
        preferredPlatforms: state.preferredPlatforms.filter(
          (p) => p !== platform,
        ),
      });
    } else {
      updateState({
        preferredPlatforms: [...state.preferredPlatforms, platform],
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
          Target Audience
        </h1>
        <p className="text-muted-foreground">
          Define who you want to reach with your influencer campaigns.
        </p>
      </div>

      <div className="space-y-6 mt-8">
        <div className="space-y-3">
          <Label className="text-base font-medium">
            Age Range (Select all that apply)
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ageRangeOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 rounded-lg p-2 hover:bg-muted/50 transition-colors"
              >
                <input
                  type="checkbox"
                  id={`age-${option.id}`}
                  checked={state.ageRanges.includes(option.id)}
                  onChange={(e) =>
                    handleAgeRangeChange(option.id, e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor={`age-${option.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Gender</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {genderOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 rounded-lg p-2 hover:bg-muted/50 transition-colors"
              >
                <input
                  type="checkbox"
                  id={`gender-${option.id}`}
                  checked={state.genders.includes(option.id)}
                  onChange={(e) =>
                    handleGenderChange(option.id, e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor={`gender-${option.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Target Locations</Label>
          <Select onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Target Interests</Label>
          <Select onValueChange={handleInterestChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an interest" />
            </SelectTrigger>
            <SelectContent>
              {interests.map((interest) => (
                <SelectItem key={interest.id} value={interest.id}>
                  {interest.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">
            Preferred Social Media Platforms
          </Label>
          <div className="flex flex-wrap gap-2">
            {socialPlatforms.map((platform) => {
              const isSelected = state.preferredPlatforms.includes(
                platform.value,
              );
              const Icon = platform.icon;
              return (
                <button
                  key={platform.value}
                  type="button"
                  onClick={() => togglePlatform(platform.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 hover:border-primary/50"
                  }`}
                >
                  <Icon size={16} />
                  <span>{platform.label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Select the social media platforms where your target audience is most
            active.
          </p>
        </div>
      </div>
    </div>
  );
}
