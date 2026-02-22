"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter, useSelectedLayoutSegment } from "next/navigation"
import {
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  FileText,
  Bell,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@workspace/ui/lib/utils";
interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function SidebarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const { eventId } = useParams();
  const { signOut, user } = useAuth();

  const mainNavigation: NavItem[] = [
    {
      title: "Overview",
      url: `/event/${eventId}`,
      icon: LayoutDashboard,
    },
    {
      title: "Registration",
      url: `/event/${eventId}/registration`,
      icon: BarChart3,
    },
    {
      title: "Participants",
      url: `/event/${eventId}/participants`,
      icon: Users,
    },
    {
      title: "Invitations",
      url: `/event/${eventId}/invitations`,
      icon: Bell,
    },
    {
      title: "Checkers",
      url: `/event/${eventId}/checkers`,
      icon: Users,
    },
  ];
  const isActive = (url: string) => {
   const pattern = url
    .replace(/:[^/]+/g, "[^/]+")  // replace :id
    .replace(/\*/g, ".*");        // wildcard

  const regex = new RegExp(`^${pattern}$`);
  return regex.test(pathname);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const Icon = item.icon;
      const active = isActive(item.url);

      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            // isActive={active}
            tooltip={item.title}
            className={cn(active && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground")}
          >
            <Link href={item.url}>
              <Icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <Image
            src="/assets/images/eventup-logo.svg"
            alt="EventUp"
            width={120}
            height={48}
            className="h-8 w-auto"
            priority
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderNavItems(mainNavigation)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-2 space-y-2">
          {user && (
            <div className="px-2 py-1.5 text-sm">
              <p className="font-medium truncate">
                {user.displayName || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="size-4 mr-2" />
            <span>Sign Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
