"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookmarkIcon,
  CheckCircle,
  ExternalLink,
  Heart,
  Instagram,
  MessageSquare,
  InstagramIcon as TiktokIcon,
  Twitter,
  Youtube,
  TrendingUp,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface InfluencerCardProps {
  influencer: any
}

export function InfluencerCard({ influencer }: InfluencerCardProps) {
  const [saved, setSaved] = useState(false)
  const [liked, setLiked] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      case "tiktok":
        return <TiktokIcon className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-gradient-to-r from-emerald-500 to-green-500"
    if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-400"
    if (score >= 70) return "bg-gradient-to-r from-amber-500 to-yellow-500"
    return "bg-gradient-to-r from-yellow-500 to-amber-400"
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md glassmorphism hover:shadow-primary/10 group">
      <CardHeader className="p-0">
        <div className="relative">
          <div className="absolute top-2 right-2 z-10 flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={() => setSaved(!saved)}
                  >
                    <BookmarkIcon className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
                    <span className="sr-only">Save</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{saved ? "Saved" : "Save"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart className={`h-4 w-4 ${liked ? "fill-secondary text-secondary" : ""}`} />
                    <span className="sr-only">Like</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{liked ? "Liked" : "Like"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div
            className={`absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-white ${getMatchScoreColor(
              influencer.matchScore,
            )}`}
          >
            <CheckCircle className="h-3 w-3" />
            {influencer.matchScore}% Match
          </div>

          <div className="aspect-[4/3] bg-muted overflow-hidden">
            <img
              src={influencer.image || "/placeholder.svg"}
              alt={influencer.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src={influencer.image || "/placeholder.svg"} alt={influencer.name} />
              <AvatarFallback className="bg-primary/10 text-primary">{influencer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium leading-none">{influencer.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {getPlatformIcon(influencer.platform)}
                {influencer.handle}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1 bg-primary/5 border-primary/20 text-primary">
            {getPlatformIcon(influencer.platform)}
            {influencer.platform}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div className="rounded-md glassmorphism p-2">
            <p className="text-xs text-muted-foreground">Followers</p>
            <p className="font-medium">{formatNumber(influencer.followers)}</p>
          </div>
          <div className="rounded-md glassmorphism p-2">
            <p className="text-xs text-muted-foreground">Engagement</p>
            <p className="font-medium flex items-center justify-center gap-1">
              {influencer.engagementRate}%
              <TrendingUp className="h-3 w-3 text-green-500" />
            </p>
          </div>
          <div className="rounded-md glassmorphism p-2">
            <p className="text-xs text-muted-foreground">Posts</p>
            <p className="font-medium">{influencer.recentPosts}</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Categories</p>
          <div className="flex flex-wrap gap-1">
            {influencer.categories.map((category: string) => (
              <Badge
                key={category}
                variant="secondary"
                className="text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Location</p>
          <p className="text-sm">{influencer.location}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary"
            >
              View Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] glassmorphism border-white/10 dark:border-gray-800/50">
            <DialogHeader>
              <DialogTitle>Influencer Profile</DialogTitle>
              <DialogDescription>Detailed information about {influencer.name}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={influencer.image || "/placeholder.svg"} alt={influencer.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">{influencer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{influencer.name}</h2>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {getPlatformIcon(influencer.platform)}
                    <span>{influencer.handle}</span>
                  </div>
                  <p className="text-sm mt-1">{influencer.location}</p>
                </div>
                <div
                  className={`ml-auto flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-white ${getMatchScoreColor(
                    influencer.matchScore,
                  )}`}
                >
                  <CheckCircle className="h-4 w-4" />
                  {influencer.matchScore}% Match
                </div>
              </div>

              <div className="border-t pt-4 border-white/10 dark:border-gray-800/50">
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">{influencer.bio}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg glassmorphism p-3 text-center">
                  <p className="text-xs text-muted-foreground">Followers</p>
                  <p className="text-lg font-semibold">{formatNumber(influencer.followers)}</p>
                </div>
                <div className="rounded-lg glassmorphism p-3 text-center">
                  <p className="text-xs text-muted-foreground">Engagement</p>
                  <p className="text-lg font-semibold flex items-center justify-center gap-1">
                    {influencer.engagementRate}%
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </p>
                </div>
                <div className="rounded-lg glassmorphism p-3 text-center">
                  <p className="text-xs text-muted-foreground">Avg. Likes</p>
                  <p className="text-lg font-semibold">{formatNumber(influencer.averageLikes)}</p>
                </div>
              </div>

              <div className="border-t pt-4 border-white/10 dark:border-gray-800/50">
                <h3 className="font-medium mb-2">Audience Demographics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Age</p>
                    <p className="text-sm">{influencer.audienceDemo.age}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Gender</p>
                    <p className="text-sm">{influencer.audienceDemo.gender}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Top Locations</p>
                    <p className="text-sm">{influencer.audienceDemo.topLocations.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 border-white/10 dark:border-gray-800/50">
                <h3 className="font-medium mb-2">Estimated Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Post</p>
                    <p className="text-sm">{influencer.pricing.post}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Story</p>
                    <p className="text-sm">{influencer.pricing.story}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Video</p>
                    <p className="text-sm">{influencer.pricing.video}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary"
              >
                Save Profile
              </Button>
              <Button className="rounded-full bg-gradient-brand hover:opacity-90">Contact Influencer</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="default" size="sm" className="w-full ml-2 rounded-full bg-gradient-brand hover:opacity-90">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  )
}
