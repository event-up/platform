'use client'

import BottomNav, { NavigationItem } from "@/components/BottomNav";
import { Providers } from "@/components/providers";
import { LucideIcon, ScanLineIcon, SearchIcon } from 'lucide-react';

const navigationItems: NavigationItem[] = [
  { name: 'Scanner', value: 'scanner', icon: ScanLineIcon, path: '/scanner' },
  { name: 'Search', value: 'search', icon: SearchIcon, path: '/search' },
];

export default function CheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen pb-16">
        {children}
      </div>
      <BottomNav items={navigationItems} />
    </Providers>
  );
}
