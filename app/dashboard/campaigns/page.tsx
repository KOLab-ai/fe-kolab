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
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

// Interface untuk data campaign sesuai dengan form onboarding
interface Campaign {
  id: string;
  role: string;
  fullName: string;
  email: string;
  company: string;
  position: string;
  campaignGoals: string[];
  socialPlatforms: string[];
  budgetRange: string;
  timeline: string;
  targetAgeRange: string[];
  targetGender: string[];
  targetLocations: string[];
  targetInterests: string[];
  preferredPlatforms: string[];
  productCategory: string;
  productDescription: string;
  status: "draft" | "active" | "completed" | "cancelled";
  createdAt: string;
}

// Dummy data untuk campaign
const dummyCampaigns: Campaign[] = [
  {
    id: "1",
    role: "brand",
    fullName: "John Doe",
    email: "john@example.com",
    company: "Fashion Brand X",
    position: "Marketing Manager",
    campaignGoals: ["Brand Awareness", "Product Launch"],
    socialPlatforms: ["Instagram", "TikTok"],
    budgetRange: "50M - 100M",
    timeline: "3 months",
    targetAgeRange: ["18-24", "25-34"],
    targetGender: ["Female"],
    targetLocations: ["Jakarta", "Surabaya"],
    targetInterests: ["Fashion", "Lifestyle"],
    preferredPlatforms: ["Instagram", "TikTok"],
    productCategory: "Fashion",
    productDescription: "Summer collection launch campaign",
    status: "active",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    role: "brand",
    fullName: "Jane Smith",
    email: "jane@example.com",
    company: "Tech Company Y",
    position: "Digital Marketing",
    campaignGoals: ["Product Review", "Brand Awareness"],
    socialPlatforms: ["YouTube", "Instagram"],
    budgetRange: "20M - 50M",
    timeline: "1 month",
    targetAgeRange: ["25-34", "35-44"],
    targetGender: ["All"],
    targetLocations: ["Jakarta"],
    targetInterests: ["Technology", "Gadgets"],
    preferredPlatforms: ["YouTube", "Instagram"],
    productCategory: "Technology",
    productDescription: "New smartphone launch campaign",
    status: "draft",
    createdAt: "2024-03-10",
  },
];

export default function CampaignPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [campaigns] = useState<Campaign[]>(dummyCampaigns);

  // Calculate pagination
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = campaigns.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to get status badge color
  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
                  <TableHead className="w-[25%]">Campaign Details</TableHead>
                  <TableHead className="w-[15%]">Company</TableHead>
                  <TableHead className="w-[20%]">Goals & Platforms</TableHead>
                  <TableHead className="w-[20%]">Target Audience</TableHead>
                  <TableHead className="w-[15%]">Budget & Timeline</TableHead>
                  <TableHead className="w-[5%]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="line-clamp-1">{campaign.productDescription}</span>
                        <span className="text-sm text-muted-foreground">
                          {campaign.productCategory}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Created: {new Date(campaign.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="line-clamp-1">{campaign.company}</span>
                        <span className="text-sm text-muted-foreground">
                          {campaign.position}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap gap-1">
                          {campaign.campaignGoals.map((goal, idx) => (
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
                          {campaign.socialPlatforms.map((platform, idx) => (
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
                          {campaign.targetAgeRange.join(", ")}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Gender:</span>{" "}
                          {campaign.targetGender.join(", ")}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Location:</span>{" "}
                          {campaign.targetLocations.join(", ")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">Budget:</span>
                        <span className="text-sm">{campaign.budgetRange}</span>
                        <span className="font-medium mt-1">Timeline:</span>
                        <span className="text-sm">{campaign.timeline}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(campaign.status)} capitalize`}
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, campaigns.length)} of {campaigns.length}{" "}
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
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