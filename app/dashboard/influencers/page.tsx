"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
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

// Transform the data to ensure address is always string | null
const transformedData: Influencer[] = dummyData.map((influencer) => ({
  ...influencer,
  address: typeof influencer.address === "number" ? null : influencer.address,
}));

export default function InfluencersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to show per page
  const [influencers] = useState<Influencer[]>(transformedData);

  // Calculate pagination
  const totalPages = Math.ceil(influencers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = influencers.slice(startIndex, endIndex);

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
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Influencers List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Influencer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Engagement Rate</TableHead>
                <TableHead>Platforms</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((influencer, index) => (
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
                        <span>{influencer.full_name}</span>
                        <span className="text-sm text-muted-foreground">
                          {influencer.social_platforms[0]?.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{influencer.domicile}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {influencer.categories.slice(0, 5).map((category, idx) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20"
                        >
                          {category}
                        </Badge>
                      ))}
                      {influencer.categories.length > 5 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="secondary"
                                className="text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20 cursor-help"
                              >
                                +{influencer.categories.length - 5}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[300px] p-3">
                              <div className="flex flex-wrap gap-1.5">
                                {influencer.categories.slice(5).map((category) => (
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
                      {influencer.social_platforms.map((platform, idx) => {
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
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, influencers.length)} of {influencers.length}{" "}
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
    </div>
  );
}
