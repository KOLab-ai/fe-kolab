"use client"

import type React from "react"

import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface ProductCategoryProps {
  formData: any
  updateFormData: (fieldName: string, value: any) => void
  setIsNextDisabled: (isDisabled: boolean) => void
}

export function ProductCategory({ formData, updateFormData, setIsNextDisabled }: ProductCategoryProps) {
  const categoryOptions = [
    { id: "fashion", label: "Fashion & Apparel" },
    { id: "beauty", label: "Beauty & Cosmetics" },
    { id: "tech", label: "Technology & Electronics" },
    { id: "food", label: "Food & Beverage" },
    { id: "health", label: "Health & Wellness" },
    { id: "travel", label: "Travel & Hospitality" },
    { id: "home", label: "Home & Lifestyle" },
    { id: "games", label: "Gaming & Entertainment" },
    { id: "finance", label: "Finance & Business" },
    { id: "education", label: "Education & Learning" },
    { id: "sports", label: "Sports & Fitness" },
    { id: "other", label: "Other" },
  ]

  useEffect(() => {
    // Check if a category is selected and description has at least 10 characters
    const isValid = formData.productCategory && formData.productDescription?.length >= 10
    setIsNextDisabled(!isValid)
  }, [formData.productCategory, formData.productDescription, setIsNextDisabled])

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData("productDescription", e.target.value)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
          Product Category
        </h1>
        <p className="text-muted-foreground">Tell us about the product or service you want to promote.</p>
      </div>

      <div className="space-y-6 mt-8">
        <div className="space-y-3">
          <Label className="text-base font-medium">Product Category</Label>
          <RadioGroup
            value={formData.productCategory || ""}
            onValueChange={(value) => updateFormData("productCategory", value)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {categoryOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 rounded-lg p-2 hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem
                  value={option.id}
                  id={`category-${option.id}`}
                  className="text-primary border-muted-foreground/50"
                />
                <label
                  htmlFor={`category-${option.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label htmlFor="product-description" className="text-base font-medium">
            Product Description
          </Label>
          <Textarea
            id="product-description"
            placeholder="Describe your product or service in detail, including key features, benefits, and selling points..."
            value={formData.productDescription || ""}
            onChange={handleDescriptionChange}
            className="min-h-[120px] rounded-lg focus-visible:ring-primary resize-none"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Minimum 10 characters</span>
            <span className={formData.productDescription?.length >= 10 ? "text-primary" : ""}>
              {formData.productDescription?.length || 0} characters
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-center text-muted-foreground pt-4">
        This information will help us match you with influencers who have experience in your product category.
      </p>
    </div>
  )
}
