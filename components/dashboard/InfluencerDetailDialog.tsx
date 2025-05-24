"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Instagram, MessageSquare, TrendingUp, Twitter, Youtube } from "lucide-react";
import { SocialIcon } from "react-social-icons";

interface RateCard {
  title: string;
  price: number;
}

interface SocialPlatform {
  platform: string;
  profile_url: string;
  username: string;
  followers: number;
  rate_cards: RateCard[];
  engagement_rate?: string;
  avg_likes_per_post?: string;
  avg_comments_per_post?: string;
  avg_views_per_post?: string;
}

interface Influencer {
  slug: string;
  full_name: string;
  profile_picture_url: string;
  domicile: string;
  description: any;
  email: string;
  phone: any;
  address: string | null;
  categories: string[];
  social_platforms: SocialPlatform[];
  source_url: string;
}

interface InfluencerDetailDialogProps {
  influencer: Influencer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InfluencerDetailDialog({
  influencer,
  open,
  onOpenChange,
}: InfluencerDetailDialogProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      case "tiktok":
        return <Instagram className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getHighestFollowers = (platforms: SocialPlatform[]) => {
    return Math.max(...platforms.map((p) => p.followers));
  };

  const getHighestEngagementRate = (platforms: SocialPlatform[]) => {
    const rates = platforms
      .filter((p) => p.engagement_rate)
      .map((p) => parseFloat(p.engagement_rate?.replace("%", "") || "0"));
    return rates.length > 0 ? Math.max(...rates) : 0;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] glassmorphism border-white/10 dark:border-gray-800/50 flex flex-col">
        <DialogHeader className="flex-none">
          <DialogTitle>Influencer Profile</DialogTitle>
          <DialogDescription>
            Detailed information about {influencer.full_name}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage
                  src={influencer.profile_picture_url}
                  alt={influencer.full_name}
                />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {influencer.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{influencer.full_name}</h2>
                {/* <div className="flex items-center gap-2 mt-1">
                  {influencer.social_platforms.map((platform, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-muted-foreground">
                      {getPlatformIcon(platform.platform)}
                      <span>@{platform.username}</span>
                    </div>
                  ))}
                </div> */}
                <p className="text-sm mt-1">{influencer.domicile}</p>
              </div>
            </div>

            <div className="border-t pt-4 border-white/10 dark:border-gray-800/50">
              <h3 className="font-medium mb-2">Bio</h3>
              <p className="text-sm text-muted-foreground">
                {influencer.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg glassmorphism p-3 text-center">
                <p className="text-xs text-muted-foreground">Followers</p>
                <p className="text-lg font-semibold">
                  {formatNumber(getHighestFollowers(influencer.social_platforms))}
                </p>
              </div>
              <div className="rounded-lg glassmorphism p-3 text-center">
                <p className="text-xs text-muted-foreground">Engagement</p>
                <p className="text-lg font-semibold flex items-center justify-center gap-1">
                  {getHighestEngagementRate(influencer.social_platforms).toFixed(2)}%
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </p>
              </div>
              <div className="rounded-lg glassmorphism p-3 text-center">
                <p className="text-xs text-muted-foreground">Categories</p>
                <p className="text-lg font-semibold">
                  {influencer.categories.length}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 border-white/10 dark:border-gray-800/50">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-1">
                {influencer.categories.map((category) => (
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

            <div className="border-t pt-4 border-white/10 dark:border-gray-800/50">
              <h3 className="font-medium mb-2">Social Platforms</h3>
              <div className="grid gap-3">
                {influencer.social_platforms.map((platform, idx) => (
                  <div key={idx} className="rounded-lg glassmorphism overflow-hidden">
                    <div className="flex items-center justify-between p-3 border-b border-white/10 dark:border-gray-800/50">
                      <div className="flex items-center gap-3">
                        <SocialIcon
                          network={platform.platform.toLowerCase()}
                          style={{ height: 32, width: 32 }}
                        />
                        <div>
                          <p className="font-medium">@{platform.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(platform.followers)} followers
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {platform.engagement_rate || "N/A"} engagement
                        </p>
                      </div>
                    </div>
                    {platform.rate_cards.length > 0 && (
                      <div className="p-3">
                        <h4 className="text-sm font-medium mb-2">Rate Cards</h4>
                        <div className="grid gap-2">
                          {platform.rate_cards.map((rate, rateIdx) => (
                            <div key={rateIdx} className="flex items-center justify-between p-2 rounded-md bg-background/50">
                              <p className="text-sm">{rate.title}</p>
                              <p className="text-sm font-medium text-primary">
                                {formatCurrency(rate.price)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="p-3 border-t border-white/10 dark:border-gray-800/50 bg-background/30">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {platform.avg_likes_per_post && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Avg. Likes</span>
                            <span className="font-medium">{platform.avg_likes_per_post}</span>
                          </div>
                        )}
                        {platform.avg_comments_per_post && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Avg. Comments</span>
                            <span className="font-medium">{platform.avg_comments_per_post}</span>
                          </div>
                        )}
                        {platform.avg_views_per_post && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Avg. Views</span>
                            <span className="font-medium">{platform.avg_views_per_post}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 border-white/10 dark:border-gray-800/50">
              <h3 className="font-medium mb-2">Contact Information</h3>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground w-20">Email:</p>
                  <p className="text-sm">{influencer.email}</p>
                </div>
                {influencer.phone && (
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground w-20">Phone:</p>
                    <p className="text-sm">{influencer.phone}</p>
                  </div>
                )}
                {influencer.address && (
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground w-20">Address:</p>
                    <p className="text-sm">{influencer.address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-none flex justify-between pt-4 border-t border-white/10 dark:border-gray-800/50">
          <Button
            variant="outline"
            className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary"
          >
            Save Profile
          </Button>
          <Button className="rounded-full bg-gradient-brand hover:opacity-90">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Influencer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 