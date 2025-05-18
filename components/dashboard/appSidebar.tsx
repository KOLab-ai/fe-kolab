import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Brain } from "lucide-react";
import { Home, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Influencers",
      icon: Users,
      href: "/dashboard/influencers",
      active: pathname === "/dashboard/influencers",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="bg-background">
        <div className="flex h-16 items-center px-4 border-b">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
              KOLab.ai
            </span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center rounded-lg mt-2 px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary",
                  route.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground",
                )}
              >
                <route.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-transform group-hover:scale-110",
                    route.active ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <span>{route.label}</span>
                {route.active && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
