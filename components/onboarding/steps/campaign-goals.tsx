"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Instagram, Youtube, Twitter, Facebook, TwitterIcon as TikTok } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CampaignGoalsProps {
  formData: any
  updateFormData: (fieldName: string, value: any) => void
  setIsNextDisabled: (isDisabled: boolean) => void
}

export function CampaignGoals({ formData, updateFormData, setIsNextDisabled }: CampaignGoalsProps) {
  // Initialize state from formData
  const [state, setState] = useState({
    goals: formData.campaignGoals || [],
    budgetRange: formData.budgetRange || "",
    timeline: formData.timeline || "",
    platforms: formData.socialPlatforms || [],
  })

  const campaignGoalOptions = [
    { id: "brand-awareness", label: "Increase Brand Awareness" },
    { id: "product-launch", label: "Product Launch" },
    { id: "content-creation", label: "Content Creation" },
    { id: "sales-conversion", label: "Sales Conversion" },
    { id: "social-engagement", label: "Social Media Engagement" },
    { id: "lead-generation", label: "Lead Generation" },
  ]

  const budgetRangeOptions = [
    { id: "under-5k", label: "Under $5,000" },
    { id: "5k-10k", label: "5,000 - $10,000" },
    { id: "10k-25k", label: "$10,000 - $25,000" },
    { id: "25k-50k", label: "$25,000 - $50,000" },
    { id: "over-50k", label: "Over $50,000" },
  ]

  const timelineOptions = [
    { id: "less-than-1-month", label: "Less than 1 month" },
    { id: "1-3-months", label: "1-3 months" },
    { id: "3-6-months", label: "3-6 months" },
    { id: "6-12-months", label: "6-12 months" },
    { id: "more-than-12-months", label: "More than 12 months" },
  ]

  const socialPlatforms = [
    { id: "instagram", label: "Instagram", icon: Instagram },
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "twitter", label: "Twitter", icon: Twitter },
    { id: "facebook", label: "Facebook", icon: Facebook },
    { id: "tiktok", label: "TikTok", icon: TikTok },
  ]

  // Single useEffect to check validity and update parent
  useEffect(() => {
    // Update parent form data
    updateFormData("campaignGoals", state.goals)
    updateFormData("budgetRange", state.budgetRange)
    updateFormData("timeline", state.timeline)
    updateFormData("socialPlatforms", state.platforms)

    // Check if form is valid
    const isValid = state.goals.length > 0 && state.budgetRange && state.timeline
    setIsNextDisabled(!isValid)
  }, [state, updateFormData, setIsNextDisabled])

  // Single handler for all state updates
  const updateState = (field: string, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }))
  }

  // Toggle a goal selection
  const handleGoalToggle = (goalId: string, checked: boolean) => {
    if (checked) {
      updateState("goals", [...state.goals, goalId])
    } else {
      updateState(
        "goals",
        state.goals.filter((id) => id !== goalId),
      )
    }
  }

  // Toggle a platform selection
  const handlePlatformToggle = (platformId: string) => {
    if (state.platforms.includes(platformId)) {
      updateState(
        "platforms",
        state.platforms.filter((id) => id !== platformId),
      )
    } else {
      updateState("platforms", [...state.platforms, platformId])
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
          Campaign Goals
        </h1>
        <p className="text-muted-foreground">
          Help us understand what you want to achieve with your influencer campaigns.
        </p>
      </div>

      <div className="space-y-6 mt-8">
        <div className="space-y-3">
          <Label className="text-base font-medium">What are your primary campaign goals? (Select all that apply)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {campaignGoalOptions.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center space-x-2 rounded-lg p-2 hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={goal.id}
                  checked={state.goals.includes(goal.id)}
                  onCheckedChange={(checked) => handleGoalToggle(goal.id, checked === true)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor={goal.id}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                >
                  {goal.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">What's your campaign budget range?</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {budgetRangeOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 rounded-lg p-2 hover:bg-muted/50 transition-colors"
              >
                <input
                  type="radio"
                  id={`budget-${option.id}`}
                  name="budgetRange"
                  value={option.id}
                  checked={state.budgetRange === option.id}
                  onChange={() => updateState("budgetRange", option.id)}
                  className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor={`budget-${option.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">What's your campaign timeline?</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timelineOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 rounded-lg p-2 hover:bg-muted/50 transition-colors"
              >
                <input
                  type="radio"
                  id={`timeline-${option.id}`}
                  name="timeline"
                  value={option.id}
                  checked={state.timeline === option.id}
                  onChange={() => updateState("timeline", option.id)}
                  className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor={`timeline-${option.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Target Social Media Platforms</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.id}
                type="button"
                variant={state.platforms.includes(platform.id) ? "default" : "outline"}
                className={`justify-start gap-2 rounded-lg transition-all ${
                  state.platforms.includes(platform.id) ? "bg-primary hover:bg-primary/90" : "hover:border-primary/50"
                }`}
                onClick={() => handlePlatformToggle(platform.id)}
              >
                {platform.icon && <platform.icon className="h-4 w-4" />}
                {platform.label}
              </Button>
            ))}
          </div>
        </div>

        {state.platforms.length > 0 && (
          <div className="space-y-2">
            <Label className="text-base font-medium">Selected Platforms</Label>
            <div className="flex flex-wrap gap-2">
              {state.platforms.map((platformId) => {
                const platform = socialPlatforms.find((p) => p.id === platformId)
                if (!platform) return null
                return (
                  <Badge
                    key={platformId}
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary"
                  >
                    {platform.icon && <platform.icon className="h-3 w-3" />}
                    {platform.label}
                    <button
                      type="button"
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={() => handlePlatformToggle(platformId)}
                    >
                      <span className="sr-only">Remove {platform.label}</span>
                      <span className="text-xs">×</span>
                    </button>
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
