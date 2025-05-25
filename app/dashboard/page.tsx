"use client";

import { useState, useEffect, Suspense } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RateCard {
  title: string;
  price: number;
}

interface SocialPlatform {
  id: string;
  platform: string;
  profile_url: string;
  username: string;
  followers: number;
  engagement_rate: string | null;
  avg_likes_per_post: string | null;
  avg_comments_per_post: string | null;
  avg_views_per_post: string | null;
  rate_cards: RateCard[];
}

interface ApiInfluencer {
  id: string;
  full_name: string;
  profile_picture: string;
  domicile: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  categories: string[];
  social_platforms: SocialPlatform[];
}

interface TransformedInfluencer {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: number;
  engagementRate: number;
  categories: string[];
  matchScore: number;
  location: string;
  image: string;
  recentPosts: number;
  averageLikes: string;
  averageComments: string;
  bio: string;
  audienceDemo: {
    age: string;
    gender: string;
    topLocations: string[];
  };
  pricing: {
    post: string;
    story: string;
    video: string;
  };
}

interface Campaign {
  id: string;
  title: string;
}

// Function to transform API data into the format expected by components
const transformApiData = (apiData: ApiInfluencer[]): TransformedInfluencer[] => {
  return apiData.map((influencer) => {
    // Get the primary platform (Instagram if available, otherwise first platform)
    const primaryPlatform = influencer.social_platforms.find(p => p.platform === "Instagram") || influencer.social_platforms[0];
    
    // Calculate total followers across all platforms
    const totalFollowers = influencer.social_platforms.reduce((sum, platform) => sum + (platform.followers || 0), 0);
    
    // Get the highest engagement rate
    const highestEngagementRate = Math.max(
      ...influencer.social_platforms
        .map(p => parseFloat(p.engagement_rate || '0'))
        .filter(rate => !isNaN(rate))
    );

    return {
      id: influencer.id,
      name: influencer.full_name,
      handle: `@${primaryPlatform?.username || ''}`,
      platform: primaryPlatform?.platform || 'Unknown',
      followers: totalFollowers,
      engagementRate: highestEngagementRate,
      categories: influencer.categories,
      matchScore: Math.floor(Math.random() * 20) + 80, // Placeholder for now
      location: influencer.domicile,
      image: influencer.profile_picture,
      recentPosts: Math.floor(Math.random() * 30) + 10, // Placeholder for now
      averageLikes: primaryPlatform?.avg_likes_per_post || '0',
      averageComments: primaryPlatform?.avg_comments_per_post || '0',
      bio: influencer.description,
      audienceDemo: {
        age: "18-34 (75%)", // Placeholder for now
        gender: "Mixed", // Placeholder for now
        topLocations: ["Indonesia"], // Placeholder for now
      },
      pricing: {
        post: `Rp ${primaryPlatform?.rate_cards?.[0]?.price?.toLocaleString() || '0'}`,
        story: `Rp ${primaryPlatform?.rate_cards?.[1]?.price?.toLocaleString() || '0'}`,
        video: `Rp ${primaryPlatform?.rate_cards?.[2]?.price?.toLocaleString() || '0'}`,
      },
    };
  });
};

// Client component for handling search params
function DashboardContent() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [influencers, setInfluencers] = useState<TransformedInfluencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = getCookie('access_token');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BE_API}/campaigns/`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        setCampaigns(data.results);
        // Set first campaign as selected by default
        if (data.results.length > 0) {
          setSelectedCampaign(data.results[0].id);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  // Fetch influencers when selected campaign changes
  useEffect(() => {
    const fetchInfluencers = async () => {
      if (!selectedCampaign) return;

      setLoading(true);
      try {
        const token = getCookie('access_token');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BE_API}/campaigns/${selectedCampaign}/recommendations/`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        setInfluencers(transformApiData(data));
      } catch (error) {
        console.error('Error fetching influencers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, [selectedCampaign]);

  // Calculate metrics
  const totalMatches = influencers.length;
  const potentialReach = influencers.reduce((sum, inf) => sum + inf.followers, 0);
  const avgMatchScore = Math.round(
    influencers.reduce((sum, inf) => sum + inf.matchScore, 0) / influencers.length
  );

  const handleCampaignChange = (value: string) => {
    setSelectedCampaign(value);
    
    // Update URL query parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set('campaign', value);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    // Get initial campaign from URL query parameter
    const campaignId = searchParams.get('campaign');
    if (campaignId) {
      setSelectedCampaign(campaignId);
    }
  }, [searchParams]);

  return (
    <div className="flex-1 p-4 md:p-6 mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here are your AI-powered influencer recommendations.
          </p>
        </div>
        <div className="w-[200px]">
          <Select
            value={selectedCampaign}
            onValueChange={handleCampaignChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select campaign" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricsCard
          title="Total Matches"
          value={totalMatches.toString()}
          description="Potential influencers"
          trend="+12% from last week"
          trendUp={true}
          icon="users"
        />
        <MetricsCard
          title="Potential Reach"
          value={`${(potentialReach / 1000000).toFixed(1)}M`}
          description="Combined audience"
          trend="+8% from last week"
          trendUp={true}
          icon="trending-up"
        />
        <MetricsCard
          title="Avg. Match Score"
          value={`${avgMatchScore}%`}
          description="Based on your criteria"
          trend="+5% from last week"
          trendUp={true}
          icon="percent"
        />
      </div>

      <Tabs defaultValue="recommendations" className="mb-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="saved">Saved (0)</TabsTrigger>
          <TabsTrigger value="contacted">Contacted (0)</TabsTrigger>
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
                {/* <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    Filters
                  </Button>
                </div> */}
              </div>
            </CardHeader>
            <CardContent>
              {/* <FilterBar
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              /> */}

              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Loading influencers...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {influencers.map((influencer) => (
                    <InfluencerCard key={influencer.id} influencer={influencer} campaignId={selectedCampaign} />
                  ))}
                </div>
              )}

              {/* <div className="mt-6 flex justify-center">
                <Button variant="outline" className="mr-2">
                  Load More
                </Button>
                <Button variant="link" className="text-primary">
                  View All Recommendations
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div> */}
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

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div> */}
    </div>
  );
}

// Main page component
export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
