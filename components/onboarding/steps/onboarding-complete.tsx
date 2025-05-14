"use client"

import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface OnboardingCompleteProps {
  formData: any
}

export function OnboardingComplete({ formData }: OnboardingCompleteProps) {
  return (
    <div className="flex flex-col items-center space-y-6 animate-in fade-in duration-500 py-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary/20 to-pink-500/20 flex items-center justify-center">
        <CheckCircle2 className="w-12 h-12 text-primary" />
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
          Onboarding Complete!
        </h1>
        <p className="text-muted-foreground">
          Thank you for providing your information. We're ready to help you find the perfect influencers.
        </p>
      </div>

      <div className="border rounded-xl p-6 w-full bg-card shadow-sm mt-6 hover:shadow-md transition-all">
        <h2 className="font-semibold text-lg mb-4 text-primary">Your Profile Summary</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
            <p className="text-base capitalize">{formData.role}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
            <p className="text-base">{formData.fullName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
            <p className="text-base">{formData.company}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Primary Campaign Goal</h3>
            <p className="text-base">
              {formData.campaignGoals?.[0] ? formatCampaignGoal(formData.campaignGoals[0]) : "N/A"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Budget Range</h3>
            <p className="text-base">{formatBudget(formData.budgetRange)}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Product Category</h3>
            <p className="text-base">{formatCategory(formData.productCategory)}</p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-3 w-full">
        <p className="text-muted-foreground">
          What's next? Proceed to your dashboard to start exploring recommended influencers.
        </p>
        <Link href="/dashboard" passHref className="w-full">
          <Button className="w-full md:w-auto rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground pt-2">You can update your preferences anytime from settings.</p>
      </div>
    </div>
  )
}

function formatCampaignGoal(goalId: string): string {
  const goals: Record<string, string> = {
    "brand-awareness": "Increase Brand Awareness",
    "product-launch": "Product Launch",
    "content-creation": "Content Creation",
    "sales-conversion": "Sales Conversion",
    "social-engagement": "Social Media Engagement",
    "lead-generation": "Lead Generation",
  }
  return goals[goalId] || goalId
}

function formatBudget(budgetId: string): string {
  const budgets: Record<string, string> = {
    "under-5k": "Under $5,000",
    "5k-10k": "$5,000 - $10,000",
    "10k-25k": "$10,000 - $25,000",
    "25k-50k": "$25,000 - $50,000",
    "over-50k": "Over $50,000",
  }
  return budgets[budgetId] || "N/A"
}

function formatCategory(categoryId: string): string {
  const categories: Record<string, string> = {
    fashion: "Fashion & Apparel",
    beauty: "Beauty & Cosmetics",
    tech: "Technology & Electronics",
    food: "Food & Beverage",
    health: "Health & Wellness",
    travel: "Travel & Hospitality",
    home: "Home & Lifestyle",
    games: "Gaming & Entertainment",
    finance: "Finance & Business",
    education: "Education & Learning",
    sports: "Sports & Fitness",
    other: "Other",
  }
  return categories[categoryId] || "N/A"
}
