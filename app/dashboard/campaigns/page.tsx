"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { getCookie } from 'cookies-next';

// Interface for API response
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Campaign[];
}

// Interface for campaign data from API
interface Campaign {
  id: string;
  title: string;
  campaign_goals: string[];
  social_platforms: string[];
  budget_range: string;
  timeline: string;
  target_age_range: string[];
  target_gender: string[];
  target_locations: string[];
  target_interests: string[];
  preferred_platforms: string[];
  product_category: string;
  product_description: string;
}

export default function CampaignPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getCampaigns(page);
  };

  const getCampaigns = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const token = getCookie('access_token');
      
      const headers = {
        "Authorization": `Bearer ${token}`
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BE_API}/campaigns/?page=${page}`, { headers });
      const data: ApiResponse = await response.json();
      
      setCampaigns(data.results);
      setTotalItems(data.count);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCampaigns(1);
  }, []);

  // Calculate total pages based on API response
  const totalPages = Math.ceil(totalItems / 10); // Assuming 10 items per page from API

  return (
    <div className="w-full p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Campaign List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Campaign Title</TableHead>
                  <TableHead className="w-[20%]">Goals & Platforms</TableHead>
                  <TableHead className="w-[20%]">Target Audience</TableHead>
                  <TableHead className="w-[15%]">Budget & Timeline</TableHead>
                  <TableHead className="w-[20%]">Product Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : campaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No campaigns found
                    </TableCell>
                  </TableRow>
                ) : (
                  campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        {campaign.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-wrap gap-1">
                            {campaign.campaign_goals.map((goal, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {goal}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {campaign.social_platforms.map((platform, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-primary/10 rounded-full"
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="text-sm">
                            <span className="font-medium">Age:</span>{" "}
                            {campaign.target_age_range.join(", ")}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Gender:</span>{" "}
                            {campaign.target_gender.join(", ")}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Location:</span>{" "}
                            {campaign.target_locations.join(", ")}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Interests:</span>{" "}
                            {campaign.target_interests.join(", ")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">Budget:</span>
                          <span className="text-sm">{campaign.budget_range}</span>
                          <span className="font-medium mt-1">Timeline:</span>
                          <span className="text-sm">{campaign.timeline}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="text-sm">
                            <span className="font-medium">Preferred Platforms:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {campaign.preferred_platforms.map((platform, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
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
    </div>
  );
} 