"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export function FilterBar({ activeFilter, setActiveFilter }: FilterBarProps) {
  const filters = [
    { id: "all", label: "All" },
    { id: "fashion", label: "Fashion" },
    { id: "beauty", label: "Beauty" },
    { id: "tech", label: "Technology" },
    { id: "food", label: "Food" },
    { id: "health", label: "Health" },
    { id: "travel", label: "Travel" },
    { id: "finance", label: "Finance" },
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hidden">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full whitespace-nowrap",
            activeFilter === filter.id
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              : "",
          )}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
