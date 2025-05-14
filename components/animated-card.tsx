"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface AnimatedCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  children: React.ReactNode
  className?: string
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(({ children, className, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn("transition-all duration-300 hover:shadow-lg hover:-translate-y-1", className)}
      {...props}
    >
      {children}
    </Card>
  )
})

AnimatedCard.displayName = "AnimatedCard"

export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
