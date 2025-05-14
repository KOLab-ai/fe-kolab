"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  BarChart3,
  Brain,
  Calendar,
  CreditCard,
  Home,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  X,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  open: boolean
  onClose: () => void
}

export function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Influencers",
      icon: Users,
      href: "/dashboard/influencers",
      active: pathname === "/dashboard/influencers",
    },
    {
      label: "Campaigns",
      icon: BarChart3,
      href: "/dashboard/campaigns",
      active: pathname === "/dashboard/campaigns",
    },
    {
      label: "Calendar",
      icon: Calendar,
      href: "/dashboard/calendar",
      active: pathname === "/dashboard/calendar",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      active: pathname === "/dashboard/messages",
    },
    {
      label: "Analytics",
      icon: PieChart,
      href: "/dashboard/analytics",
      active: pathname === "/dashboard/analytics",
    },
    {
      label: "Billing",
      icon: CreditCard,
      href: "/dashboard/billing",
      active: pathname === "/dashboard/billing",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className="p-0 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="flex h-16 items-center px-6 border-b">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
                KOLab.ai
              </span>
            </Link>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-full" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-64px)] pb-10">
            <div className="px-3 py-2">
              <div className="space-y-1 py-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary",
                      route.active ? "bg-primary/10 text-primary" : "text-muted-foreground",
                    )}
                  >
                    <route.icon
                      className={cn(
                        "mr-3 h-5 w-5 transition-transform group-hover:scale-110",
                        route.active ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span>{route.label}</span>
                    {route.active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-gradient-to-r from-primary to-pink-500 p-4 text-white">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <p className="font-semibold">Pro Features</p>
                </div>
                <p className="mt-2 text-xs opacity-90">Unlock advanced analytics and AI-powered recommendations</p>
                <Button size="sm" variant="secondary" className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden h-screen border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex h-16 items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
              KOLab.ai
            </span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-3 py-2">
            <div className="space-y-1 py-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary",
                    route.active ? "bg-primary/10 text-primary" : "text-muted-foreground",
                  )}
                >
                  <route.icon
                    className={cn(
                      "mr-3 h-5 w-5 transition-transform group-hover:scale-110",
                      route.active ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span>{route.label}</span>
                  {route.active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-gradient-to-r from-primary to-pink-500 p-4 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <p className="font-semibold">Pro Features</p>
              </div>
              <p className="mt-2 text-xs opacity-90">Unlock advanced analytics and AI-powered recommendations</p>
              <Button size="sm" variant="secondary" className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white">
                Upgrade Now
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
