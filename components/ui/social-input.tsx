"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export interface SocialPlatform {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface SocialInputProps {
  platforms: SocialPlatform[]
  selected: string[]
  onSelect: (selected: string[]) => void
  placeholder?: string
}

export function SocialInput({ platforms, selected, onSelect, placeholder = "Select platforms" }: SocialInputProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onSelect(selected.filter((item) => item !== value))
    } else {
      onSelect([...selected, value])
    }
  }

  const handleRemove = (value: string) => {
    onSelect(selected.filter((item) => item !== value))
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selected.length > 0
              ? `${selected.length} platform${selected.length > 1 ? "s" : ""} selected`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search platforms..." />
            <CommandList>
              <CommandEmpty>No platforms found.</CommandEmpty>
              <CommandGroup>
                {platforms.map((platform) => {
                  const isSelected = selected.includes(platform.value)
                  return (
                    <CommandItem
                      key={platform.value}
                      value={platform.value}
                      onSelect={() => handleSelect(platform.value)}
                    >
                      <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                      <div className="flex items-center gap-2">
                        {platform.icon && <platform.icon className="h-4 w-4" />}
                        {platform.label}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value) => {
            const platform = platforms.find((p) => p.value === value)
            if (!platform) return null

            return (
              <Badge key={value} variant="secondary" className="flex items-center gap-1">
                {platform.icon && <platform.icon className="h-3 w-3" />}
                {platform.label}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => handleRemove(value)}
                >
                  <span className="sr-only">Remove {platform.label}</span>
                  <span className="text-xs">×</span>
                </button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
