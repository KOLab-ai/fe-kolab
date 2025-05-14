"use client"

import type React from "react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import { Children, type ReactNode, cloneElement, isValidElement } from "react"

interface StaggeredChildrenProps {
  children: ReactNode
  className?: string
  staggerAmount?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function StaggeredChildren({
  children,
  className,
  staggerAmount = 100,
  direction = "up",
}: StaggeredChildrenProps) {
  const { ref, isIntersecting } = useIntersectionObserver()

  const getDirectionClasses = () => {
    switch (direction) {
      case "up":
        return "translate-y-10"
      case "down":
        return "translate-y-[-10px]"
      case "left":
        return "translate-x-10"
      case "right":
        return "translate-x-[-10px]"
      case "none":
        return ""
      default:
        return "translate-y-10"
    }
  }

  const childrenArray = Children.toArray(children)

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...child.props,
            className: cn(
              child.props.className,
              "transition-all duration-700 ease-out",
              isIntersecting ? "opacity-100 transform-none" : `opacity-0 ${getDirectionClasses()}`,
            ),
            style: {
              ...child.props.style,
              transitionDelay: `${index * staggerAmount}ms`,
            },
          })
        }
        return child
      })}
    </div>
  )
}
