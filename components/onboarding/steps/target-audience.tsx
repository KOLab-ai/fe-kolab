"use client"

import { Button } from "@/components/ui/button"

import type React from "react"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { X, Instagram, Youtube, Twitter, Facebook, TwitterIcon, Twitch, Linkedin, Globe } from "lucide-react"

interface TargetAudienceProps {
  formData: any
  updateFormData: (fieldName: string, value: any) => void
  setIsNextDisabled: (isDisabled: boolean) => void
}

export function TargetAudience({ formData, updateFormData, setIsNextDisabled }: TargetAudienceProps) {
  // Consolidated state object to prevent circular dependencies
  const [state, setState] = useState({
    ageRanges: formData.targetAgeRange || [],
    genders: formData.targetGender || [],
    locations: formData.targetLocations || [],
    interests: formData.targetInterests || [],
    preferredPlatforms: formData.preferredPlatforms || [],
    newLocation: "",
    newInterest: "",
  })

  const ageRangeOptions = [
    { id: "13-17", label: "13-17" },
    { id: "18-24", label: "18-24" },
    { id: "25-34", label: "25-34" },
    { id: "35-44", label: "35-44" },
    { id: "45-54", label: "45-54" },
    { id: "55+", label: "55+" },
  ]

  const genderOptions = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "non-binary", label: "Non-binary" },
    { id: "all", label: "All genders" },
  ]

  const socialPlatforms = [
    { value: "instagram", label: "Instagram", icon: Instagram },
    { value: "youtube", label: "YouTube", icon: Youtube },
    { value: "twitter", label: "Twitter", icon: Twitter },
    { value: "facebook", label: "Facebook", icon: Facebook },
    { value: "tiktok", label: "TikTok", icon: TwitterIcon },
    { value: "twitch", label: "Twitch", icon: Twitch },
    { value: "linkedin", label: "LinkedIn", icon: Linkedin },
    { value: "blog", label: "Blogs", icon: Globe },
  ]

  // Single useEffect to update parent form data and check validity
  useEffect(() => {
    // Only update parent form data when our local state changes
    updateFormData("targetAgeRange", state.ageRanges)
    updateFormData("targetGender", state.genders)
    updateFormData("targetLocations", state.locations)
    updateFormData("targetInterests", state.interests)
    updateFormData("preferredPlatforms", state.preferredPlatforms)

    // Check if form is valid
    const isValid = state.ageRanges.length > 0 && state.genders.length > 0
    setIsNextDisabled(!isValid)
  }, [state, updateFormData, setIsNextDisabled])

  // Single function to update state
  const updateState = (newState: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...newState }))
  }

  // Handle age range selection
  const handleAgeRangeChange = (rangeId: string, checked: boolean) => {
    if (checked) {
      updateState({ ageRanges: [...state.ageRanges, rangeId] })
    } else {
      updateState({ ageRanges: state.ageRanges.filter((id) => id !== rangeId) })
    }
  }

  // Handle gender selection
  const handleGenderChange = (genderId: string, checked: boolean) => {
    if (checked) {
      // If "all genders" is selected, only select that one
      if (genderId === "all") {
        updateState({ genders: ["all"] })
      } else {
        // If a specific gender is selected, remove "all genders" if it's there
        const newGenders = [...state.genders.filter((id) => id !== "all"), genderId]
        updateState({ genders: newGenders })
      }
    } else {
      updateState({ genders: state.genders.filter((id) => id !== genderId) })
    }
  }

  // Handle location input
  const handleAddLocation = () => {
    if (state.newLocation.trim() && !state.locations.includes(state.newLocation.trim())) {
      updateState({
        locations: [...state.locations, state.newLocation.trim()],
        newLocation: "",
      })
    }
  }

  const handleRemoveLocation = (location: string) => {
    updateState({ locations: state.locations.filter((l) => l !== location) })
  }

  const handleKeyPressLocation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddLocation()
    }
  }

  // Handle interest input
  const handleAddInterest = () => {
    if (state.newInterest.trim() && !state.interests.includes(state.newInterest.trim())) {
      updateState({
        interests: [...state.interests, state.newInterest.trim()],
        newInterest: "",
      })
    }
  }

  const handleRemoveInterest = (interest: string) => {
    updateState({ interests: state.interests.filter((i) => i !== interest) })
  }

  const handleKeyPressInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddInterest()
    }
  }

  // Handle platform selection
  const togglePlatform = (platform: string) => {
    if (state.preferredPlatforms.includes(platform)) {
      updateState({ preferredPlatforms: state.preferredPlatforms.filter((p) => p !== platform) })
    } else {
      updateState({ preferredPlatforms: [...state.preferredPlatforms, platform] })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
          Target Audience
        </h1>
        <p className="text-muted-foreground">Define who you want to reach with your influencer campaigns.</p>
      </div>

      <div className="space-y-6 mt-8">
        <div className="space-y-3">
          <Label className="text-base font-medium">Age Range (Select all that apply)</Label>
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
                  onChange={(e) => handleAgeRangeChange(option.id, e.target.checked)}
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
                  onChange={(e) => handleGenderChange(option.id, e.target.checked)}
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
          <div className="flex flex-wrap gap-2 mb-2">
            {state.locations.map((location) => (
              <Badge
                key={location}
                variant="secondary"
                className="pl-3 pr-2 py-1.5 flex items-center gap-1 rounded-full bg-primary/10 text-primary"
              >
                {location}
                <button
                  type="button"
                  onClick={() => handleRemoveLocation(location)}
                  className="ml-1 hover:bg-primary/20 rounded-full p-1 transition-colors"
                >
                  <X size={12} />
                  <span className="sr-only">Remove {location}</span>
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={state.newLocation}
              onChange={(e) => updateState({ newLocation: e.target.value })}
              onKeyDown={handleKeyPressLocation}
              placeholder="Add locations (e.g., USA, France, Asia)"
              className="rounded-lg focus-visible:ring-primary"
            />
            <Button
              type="button"
              variant="outline"
              className="px-4 py-2 rounded-lg hover:border-primary/50 hover:text-primary transition-colors"
              onClick={handleAddLocation}
            >
              Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Press Enter or click Add to add multiple locations</p>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Target Interests</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {state.interests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="pl-3 pr-2 py-1.5 flex items-center gap-1 rounded-full bg-primary/10 text-primary"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  className="ml-1 hover:bg-primary/20 rounded-full p-1 transition-colors"
                >
                  <X size={12} />
                  <span className="sr-only">Remove {interest}</span>
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={state.newInterest}
              onChange={(e) => updateState({ newInterest: e.target.value })}
              onKeyDown={handleKeyPressInterest}
              placeholder="Add interests (e.g., Fashion, Technology, Fitness)"
              className="rounded-lg focus-visible:ring-primary"
            />
            <Button
              type="button"
              variant="outline"
              className="px-4 py-2 rounded-lg hover:border-primary/50 hover:text-primary transition-colors"
              onClick={handleAddInterest}
            >
              Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Press Enter or click Add to add multiple interests</p>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Preferred Social Media Platforms</Label>
          <div className="flex flex-wrap gap-2">
            {socialPlatforms.map((platform) => {
              const isSelected = state.preferredPlatforms.includes(platform.value)
              const Icon = platform.icon
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
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Select the social media platforms where your target audience is most active.
          </p>
        </div>
      </div>
    </div>
  )
}
