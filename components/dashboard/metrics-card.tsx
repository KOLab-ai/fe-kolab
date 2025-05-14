"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, BarChart3, Percent, TrendingUp, Users } from "lucide-react"

interface MetricsCardProps {
  title: string
  value: string
  description: string
  trend: string
  trendUp: boolean
  icon: string
}

export function MetricsCard({ title, value, description, trend, trendUp, icon }: MetricsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-4 w-4 text-muted-foreground" />
      case "trending-up":
        return <TrendingUp className="h-4 w-4 text-muted-foreground" />
      case "percent":
        return <Percent className="h-4 w-4 text-muted-foreground" />
      default:
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-3 flex items-center gap-1 text-xs">
          {trendUp ? <ArrowUp className="h-3 w-3 text-green-500" /> : <ArrowDown className="h-3 w-3 text-red-500" />}
          <span className={trendUp ? "text-green-500" : "text-red-500"}>{trend}</span>
        </div>
      </CardContent>
    </Card>
  )
}
