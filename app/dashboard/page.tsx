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
    name: "VOLIX",
    handle: "@volix.media",
    platform: "Instagram",
    followers: 682742,
    engagementRate: 1.06,
    categories: ["Media Publisher"],
    matchScore: 95,
    location: "Jakarta Selatan",
    image: "https://cdn.ice.id/mobile/1689577969750_image_cropper_7EA52D43-7466-48FF-8B2E-6F261E435E39-469-0000000A02A3C6B9.jpg",
    recentPosts: 15,
    averageLikes: 7200,
    averageComments: 69,
    bio: "Account Executive at VOLIX.",
    audienceDemo: {
      age: "18-34 (75%)",
      gender: "Mixed",
      topLocations: ["Indonesia"],
    },
    pricing: {
      post: "Rp 27.4M",
      story: "Rp 10.2M",
      video: "Rp 246.6M",
    },
  },
  {
    id: 2,
    name: "Puput Sumarni",
    handle: "@puputsumarni_",
    platform: "TikTok",
    followers: 430050,
    engagementRate: 4.2,
    categories: ["Actor & Actress", "Foodies", "Fashion Enthusiast", "Comedian", "Fitness & Health Enthusiast"],
    matchScore: 88,
    location: "Palembang",
    image: "https://cdn.ice.id/mobile/1692932203621_image_cropper_D1938514-D8B2-4BC0-9E10-164520049DAA-45980-00002A706FEA8203.jpg",
    recentPosts: 20,
    averageLikes: 18000,
    averageComments: 450,
    bio: "Konten kreator anak kos",
    audienceDemo: {
      age: "18-24 (65%)",
      gender: "Female (70%)",
      topLocations: ["Indonesia"],
    },
    pricing: {
      post: "Rp 2.06M",
      story: "Rp 1.5M",
      video: "Rp 3M",
    },
  },
  {
    id: 3,
    name: "Michelle Tjandra",
    handle: "@mcheltjandra",
    platform: "Instagram",
    followers: 45374,
    engagementRate: 3.29,
    categories: ["Fashion Enthusiast", "Fitness & Health Enthusiast"],
    matchScore: 85,
    location: "Depok",
    image: "https://cdn.ice.id/mobile/1719299425390_image_cropper_4EBDEE69-8A57-46BB-9D10-9793ED974962-3800-0000021AE3AF5DA3.jpg",
    recentPosts: 25,
    averageLikes: 1500,
    averageComments: 9,
    bio: "A free bird 🦜",
    audienceDemo: {
      age: "18-34 (80%)",
      gender: "Female (75%)",
      topLocations: ["Indonesia"],
    },
    pricing: {
      post: "Rp 1.1M",
      story: "Rp 412.5K",
      video: "Rp 2.06M",
    },
  },
  {
    id: 4,
    name: "Melvin",
    handle: "@melvinmaylani",
    platform: "Instagram",
    followers: 60300,
    engagementRate: 3.5,
    categories: ["Beauty & Wellness Enthusiast", "Fashion Enthusiast"],
    matchScore: 82,
    location: "Bogor",
    image: "https://cdn.ice.id/mobile/1714989951486_image_cropper_1A33E0A1-02A5-4408-BF21-31BC6BE32A11-21723-00000ED2CB56CAB0.jpg",
    recentPosts: 18,
    averageLikes: 2100,
    averageComments: 45,
    bio: "Beauty and fashion content creator",
    audienceDemo: {
      age: "18-34 (70%)",
      gender: "Female (65%)",
      topLocations: ["Indonesia"],
    },
    pricing: {
      post: "Rp 4.8M",
      story: "Rp 2.5M",
      video: "Rp 6.1M",
    },
  },
  {
    id: 5,
    name: "Akhira Maulidio",
    handle: "@akhira.mf",
    platform: "Instagram",
    followers: 60000,
    engagementRate: 3.8,
    categories: ["Beauty & Wellness Enthusiast"],
    matchScore: 79,
    location: "Yogyakarta",
    image: "https://cdn.ice.id/INFLUENCER/1717385763418-Screenshot_2024-06-03_103519.png",
    recentPosts: 22,
    averageLikes: 2300,
    averageComments: 55,
    bio: "Beauty creators & skincare enthusiast",
    audienceDemo: {
      age: "18-34 (75%)",
      gender: "Female (80%)",
      topLocations: ["Indonesia"],
    },
    pricing: {
      post: "Rp 1.2M",
      story: "Rp 500K",
      video: "Rp 825K",
    },
  },
  {
    id: 6,
    name: "ara itsme",
    handle: "@daraaitsme_",
    platform: "TikTok",
    followers: 12128,
    engagementRate: 4.1,
    categories: ["Foodies"],
    matchScore: 76,
    location: "Bandung",
    image: "https://cdn.ice.id/mobile/1728885094211_image_cropper_1CA45E28-7D64-41AD-8D46-C4D0716EF8CE-69494-00000592F9753566.jpg",  
    recentPosts: 15,
    averageLikes: 800,
    averageComments: 35,
    bio: "Master of Ceremony, Full time Tax Consulting, konten creator foodies",
    audienceDemo: {
      age: "18-34 (65%)",
      gender: "Mixed",
      topLocations: ["Indonesia"],
    },
    pricing: {
      post: "Rp 500K",
      story: "Rp 300K",
      video: "Rp 103.1K",
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
