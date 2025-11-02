'use client'

import { useRouter, usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  name: string;
  value: string;
  icon: LucideIcon;
  path: string;
}

interface BottomNavProps {
  items?: NavigationItem[];
}


export default function BottomNav({ items }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = items?.find(item => item.path === pathname)?.value || items?.[0]?.value;

  const handleTabChange = (value: string) => {
    const tab = items?.find(t => t.value === value);
    if (tab) {
      router.push(tab.path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe pointer-events-none">
      <div className="px-4 pb-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
        <div className="mx-auto max-w-xs sm:max-w-sm pointer-events-auto">
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-[20px] sm:rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
              <TabsList className="h-auto w-full p-2 sm:p-2.5 bg-transparent gap-2 sm:gap-3">
                {(items ?? []).map(({ icon: Icon, name, value }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex flex-col items-center justify-center gap-1 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3.5 flex-1 min-h-[56px] sm:min-h-[68px] rounded-[16px] sm:rounded-[20px] data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-[0_2px_12px_rgba(0,0,0,0.08)] data-[state=active]:scale-[1.02] data-[state=inactive]:hover:bg-muted/50 transition-all duration-300 ease-out"
                  >
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2} />
                    <span className="text-[10px] sm:text-xs font-semibold tracking-wide">{name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
