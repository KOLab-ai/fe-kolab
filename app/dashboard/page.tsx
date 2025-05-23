"use client";

import { useState } from "react";
import { InfluencerCard } from "@/components/dashboard/influencer-card";
import { MetricsCard } from "@/components/dashboard/metrics-card";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Download, Filter, RefreshCw, Save } from "lucide-react";

// Mock data for influencers
const mockInfluencers = [
  {
    id: 1,
    name: "Sophia Martinez",
    handle: "@sophia_creates",
    platform: "Instagram",
    followers: 245000,
    engagementRate: 3.8,
    categories: ["Fashion", "Beauty"],
    matchScore: 92,
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=400&width=400",
    recentPosts: 15,
    averageLikes: 8700,
    averageComments: 320,
    bio: "Fashion & beauty content creator sharing daily inspiration and lifestyle tips.",
    audienceDemo: {
      age: "18-34 (78%)",
      gender: "Female (82%)",
      topLocations: ["US", "UK", "Canada"],
    },
    pricing: {
      post: "$2,500",
      story: "$1,200",
      video: "$4,000",
    },
  },
  {
    id: 2,
    name: "Alex Johnson",
    handle: "@alexjtech",
    platform: "YouTube",
    followers: 520000,
    engagementRate: 4.2,
    categories: ["Technology", "Gaming"],
    matchScore: 88,
    location: "Seattle, WA",
    image: "/placeholder.svg?height=400&width=400",
    recentPosts: 8,
    averageLikes: 42000,
    averageComments: 1850,
    bio: "Tech reviewer and gaming enthusiast. New videos every Tuesday and Friday.",
    audienceDemo: {
      age: "18-34 (85%)",
      gender: "Male (74%)",
      topLocations: ["US", "Canada", "Germany"],
    },
    pricing: {
      post: "$3,000",
      story: "$1,500",
      video: "$5,500",
    },
  },
  {
    id: 3,
    name: "Priya Patel",
    handle: "@priya_wellness",
    platform: "Instagram",
    followers: 178000,
    engagementRate: 5.1,
    categories: ["Health", "Fitness"],
    matchScore: 85,
    location: "Miami, FL",
    image: "/placeholder.svg?height=400&width=400",
    recentPosts: 22,
    averageLikes: 9100,
    averageComments: 430,
    bio: "Certified fitness trainer sharing workout tips, healthy recipes, and wellness advice.",
    audienceDemo: {
      age: "25-44 (72%)",
      gender: "Female (68%)",
      topLocations: ["US", "Australia", "UK"],
    },
    pricing: {
      post: "$1,800",
      story: "$900",
      video: "$3,200",
    },
  },
  {
    id: 4,
    name: "Marcus Chen",
    handle: "@marcuseats",
    platform: "TikTok",
    followers: 1200000,
    engagementRate: 7.2,
    categories: ["Food", "Travel"],
    matchScore: 82,
    location: "New York, NY",
    image: "/placeholder.svg?height=400&width=400",
    recentPosts: 35,
    averageLikes: 87000,
    averageComments: 3200,
    bio: "Food blogger and culinary explorer. Taking you on tasty adventures around the world!",
    audienceDemo: {
      age: "18-34 (65%)",
      gender: "Mixed (52% F, 48% M)",
      topLocations: ["US", "Japan", "France"],
    },
    pricing: {
      post: "$4,500",
      story: "$2,200",
      video: "$7,000",
    },
  },
  {
    id: 5,
    name: "Emma Wilson",
    handle: "@emma_designs",
    platform: "Instagram",
    followers: 320000,
    engagementRate: 4.5,
    categories: ["Home", "Lifestyle"],
    matchScore: 79,
    location: "Portland, OR",
    image: "/placeholder.svg?height=400&width=400",
    recentPosts: 18,
    averageLikes: 14500,
    averageComments: 620,
    bio: "Interior designer sharing home decor inspiration, DIY projects, and sustainable living tips.",
    audienceDemo: {
      age: "25-44 (75%)",
      gender: "Female (78%)",
      topLocations: ["US", "Canada", "UK"],
    },
    pricing: {
      post: "$2,800",
      story: "$1,400",
      video: "$4,500",
    },
  },
  {
    id: 6,
    name: "Jordan Taylor",
    handle: "@jordanfinance",
    platform: "YouTube",
    followers: 420000,
    engagementRate: 3.9,
    categories: ["Finance", "Business"],
    matchScore: 76,
    location: "Chicago, IL",
    image: "/placeholder.svg?height=400&width=400",
    recentPosts: 12,
    averageLikes: 32000,
    averageComments: 1450,
    bio: "Financial advisor helping you make smart money decisions and build wealth for the future.",
    audienceDemo: {
      age: "25-44 (82%)",
      gender: "Mixed (55% M, 45% F)",
      topLocations: ["US", "UK", "Australia"],
    },
    pricing: {
      post: "$3,200",
      story: "$1,600",
      video: "$5,800",
    },
  },
];

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex-1 p-4 md:p-6 mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here are your AI-powered influencer recommendations.
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Save className="mr-2 h-4 w-4" />
            Save Report
          </Button>
          <Button size="sm" className="h-9">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Recommendations
          </Button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricsCard
          title="Total Matches"
          value="42"
          description="Potential influencers"
          trend="+12% from last week"
          trendUp={true}
          icon="users"
        />
        <MetricsCard
          title="Potential Reach"
          value="12.4M"
          description="Combined audience"
          trend="+8% from last week"
          trendUp={true}
          icon="trending-up"
        />
        <MetricsCard
          title="Avg. Match Score"
          value="84%"
          description="Based on your criteria"
          trend="+5% from last week"
          trendUp={true}
          icon="percent"
        />
      </div>

      <Tabs defaultValue="recommendations" className="mb-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="saved">Saved (12)</TabsTrigger>
          <TabsTrigger value="contacted">Contacted (5)</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Top Recommended Influencers</CardTitle>
                  <CardDescription>
                    Based on your campaign goals, target audience, and product
                    category.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <FilterBar
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {mockInfluencers.map((influencer) => (
                  <InfluencerCard key={influencer.id} influencer={influencer} />
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="mr-2">
                  Load More
                </Button>
                <Button variant="link" className="text-primary">
                  View All Recommendations
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Influencers</CardTitle>
              <CardDescription>
                Influencers you've saved for future reference.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 border rounded-md bg-muted/50">
                <p className="text-muted-foreground">
                  Switch to the "Recommendations" tab to view content
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contacted">
          <Card>
            <CardHeader>
              <CardTitle>Contacted Influencers</CardTitle>
              <CardDescription>
                Influencers you've already reached out to.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 border rounded-md bg-muted/50">
                <p className="text-muted-foreground">
                  Switch to the "Recommendations" tab to view content
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Overview of your current campaign metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/50">
              <p className="text-muted-foreground">
                Campaign performance chart will appear here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">New match found</p>
                  <p className="text-xs text-muted-foreground">
                    Sophia Martinez matches your campaign criteria
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">Campaign updated</p>
                  <p className="text-xs text-muted-foreground">
                    Your product launch campaign was updated
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Yesterday
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-sm font-medium">Message received</p>
                  <p className="text-xs text-muted-foreground">
                    Alex Johnson replied to your inquiry
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 days ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
