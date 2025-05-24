"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableHeader,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SocialIcon } from "react-social-icons";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import InfluencerDetailDialog from "../../../components/dashboard/InfluencerDetailDialog";

// Import dummy data
import dummyData from "@/data/csvjson.json";

interface RateCard {
  title: string
  price: number
}

// Interface untuk data influencer
interface SocialPlatform {
  platform: string
  profile_url: string
  username: string
  followers: number
  rate_cards: RateCard[]
  engagement_rate?: string
  avg_likes_per_post?: string
  avg_comments_per_post?: string
  avg_views_per_post?: string
}

interface Influencer {
  slug: string
  full_name: string
  profile_picture_url: string
  domicile: string
  description: any
  email: string
  phone: any
  address: string | null
  categories: string[]
  social_platforms: SocialPlatform[]
  source_url: string
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Influencer[];
}

// Transform the data to ensure address is always string | null
const transformedData: Influencer[] = dummyData.map((influencer) => ({
  ...influencer,
  address: typeof influencer.address === "number" ? null : influencer.address,
}));

export default function InfluencersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to get the highest follower count across all platforms
  const getHighestFollowers = (platforms: SocialPlatform[]) => {
    return Math.max(...platforms.map((p) => p.followers));
  };

  // Function to get the highest engagement rate
  const getHighestEngagementRate = (platforms: SocialPlatform[]) => {
    const rates = platforms
      .filter((p) => p.engagement_rate)
      .map((p) => parseFloat(p.engagement_rate?.replace("%", "") || "0"));
    return rates.length > 0 ? Math.max(...rates) : 0;
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getInfluencers(page);
  };

  const getInfluencers = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const cookieString = document.cookie;
      const cookieArray = cookieString.split('; ');
      const myCookie = cookieArray.find(row => row.startsWith('token='));
      const token = myCookie?.split('=')[1];
      
      const headers = {
        "Authorization": `Bearer ${token}`
      }
      const response = await fetch(`https://pc.cat-anoles.ts.net/api/v1/influencers/?page=${page}`, { headers });
      const data: ApiResponse = await response.json();
      
      const listInfluencers = data.results.map((influencer: any) => ({
        ...influencer,
        profile_picture_url: influencer.profile_picture_url || influencer.profile_picture || "/placeholder.svg?height=32&width=32",
        domicile: influencer.domicile || "Unknown",
        categories: influencer.categories || [],
        social_platforms: influencer.social_platforms || [],
      }));

      setInfluencers(listInfluencers);
      setTotalItems(data.count);
    } catch (error) {
      console.error("Error fetching influencers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfluencers(1);
  }, []);

  // Calculate total pages based on API response
  const totalPages = Math.ceil(totalItems / 10); // Assuming 10 items per page from API

  return (
    <div className="w-full p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Influencers List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Influencer</TableHead>
                  <TableHead className="w-[15%]">Location</TableHead>
                  <TableHead className="w-[20%]">Categories</TableHead>
                  <TableHead className="w-[15%]">Followers</TableHead>
                  <TableHead className="w-[15%]">Engagement Rate</TableHead>
                  <TableHead className="w-[10%]">Platforms</TableHead>
                  <TableHead className="w-[5%]">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : influencers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No influencers found
                    </TableCell>
                  </TableRow>
                ) : (
                  influencers.map((influencer: Influencer, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={influencer.profile_picture_url}
                              alt={influencer.full_name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="line-clamp-1">{influencer.full_name}</span>
                            <span className="text-sm text-muted-foreground">
                              {influencer.social_platforms[0]?.username}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{influencer.domicile}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {influencer.categories.slice(0, 3).map((category: string, idx: number) => (
                            <Badge
                              key={category}
                              variant="secondary"
                              className="text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20"
                            >
                              {category}
                            </Badge>
                          ))}
                          {influencer.categories.length > 3 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20 cursor-help"
                                  >
                                    +{influencer.categories.length - 3}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[300px] p-3">
                                  <div className="flex flex-wrap gap-1.5">
                                    {influencer.categories.slice(3).map((category: string) => (
                                      <Badge
                                        key={category}
                                        variant="secondary"
                                        className="text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20"
                                      >
                                        {category}
                                      </Badge>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getHighestFollowers(
                          influencer.social_platforms,
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {getHighestEngagementRate(
                          influencer.social_platforms,
                        ).toFixed(2)}
                        %
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {influencer.social_platforms.map((platform: SocialPlatform, idx: number) => {
                            const network = platform.platform.toLowerCase();
                            return (
                              <TooltipProvider key={idx}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="cursor-help">
                                      <SocialIcon
                                        network={network}
                                        style={{ height: 32, width: 32 }}
                                        className="hover:opacity-80 transition-opacity"
                                      />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-sm">{`@${platform.username}`}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedInfluencer(influencer)}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * 10) + 1} to{" "}
              {Math.min(currentPage * 10, totalItems)} of {totalItems}{" "}
              entries
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                
                {/* First page */}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(1)}
                    isActive={currentPage === 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {/* Left ellipsis */}
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Pages around current page */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page !== 1 &&
                      page !== totalPages &&
                      Math.abs(page - currentPage) <= 1
                  )
                  .map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {/* Right ellipsis */}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Last page */}
                {totalPages > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(totalPages)}
                      isActive={currentPage === totalPages}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {selectedInfluencer && (
        <InfluencerDetailDialog
          influencer={selectedInfluencer}
          open={!!selectedInfluencer}
          onOpenChange={(open) => !open && setSelectedInfluencer(null)}
        />
      )}
    </div>
  );
}
