"use client";

import { Bell, Menu, MessageSquare, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md glassmorphism border-b border-white/10 dark:border-gray-800/50 px-4 md:px-6">
      <div className="flex h-16 items-center gap-4 justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <SidebarTrigger className="hidden md:flex" />

        <div className="w-full flex justify-between items-center gap-4 md:gap-8">
          <form className="hidden md:flex-1 md:flex max-w-sm">
            {/* <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search influencers, campaigns..."
                className="w-full bg-background/50 pl-8 md:w-[300px] border-white/20 dark:border-gray-800/70 rounded-full"
              />
            </div> */}
          </form>

          <div className="flex items-center gap-3">
            {/* <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full bg-background/50 hover:bg-background/80"
            >
              <MessageSquare className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary">
                3
              </Badge>
              <span className="sr-only">Messages</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full bg-background/50 hover:bg-background/80"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-secondary">
                5
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button> */}

            <Button
              variant="outline"
              size="sm"
              className="rounded-full w-auto"
              onClick={() => router.push("/onboarding")}
            >
              <Plus className="h-5 w-5" />
              <p className="">Create</p>
            </Button>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background/50 hover:bg-background/80"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="glassmorphism border-white/10 dark:border-gray-800/50"
              >
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
