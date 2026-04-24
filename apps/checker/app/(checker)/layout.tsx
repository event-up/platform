"use client";

import BottomNav, { NavigationItem } from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { Providers } from "@/components/providers";
import { AuthProvider } from "@/lib/auth-context";
import { ScanLineIcon, SearchIcon } from "lucide-react";

const navigationItems: NavigationItem[] = [
  { name: "Scanner", value: "scanner", icon: ScanLineIcon, path: "/scanner" },
  { name: "Search", value: "search", icon: SearchIcon, path: "/search" },
];

export default function CheckerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <AuthProvider>
        <div className="min-h-screen pb-16">
          <TopNav />
          {children}
        </div>
        <BottomNav items={navigationItems} />
      </AuthProvider>
    </Providers>
  );
}
