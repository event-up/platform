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
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Calendar,
    BarChart3,
    Users,
    Settings,
    HelpCircle,
    FileText,
    Bell,
    LayoutDashboard,
} from "lucide-react";

interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
}

const mainNavigation: NavItem[] = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Events",
        url: "/events",
        icon: Calendar,
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
    },
    {
        title: "Attendees",
        url: "/attendees",
        icon: Users,
    },
];


export default function SidebarComponent() {
    const pathname = usePathname();

    const isActive = (url: string) => {
        if (url === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(url);
    };

    const renderNavItems = (items: NavItem[]) => {
        return items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);

            return (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={item.title}
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
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                        <Calendar className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Event Manager</span>
                        <span className="truncate text-xs text-muted-foreground">
                            Organizer Dashboard
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {renderNavItems(mainNavigation)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}