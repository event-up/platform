import type { ReactNode, CSSProperties } from "react";
import type { ThemeConfig } from "./types";

interface ThemedContainerProps {
  theme: ThemeConfig;
  children: ReactNode;
}

export function ThemedContainer({ theme, children }: ThemedContainerProps) {
  const style = {
    "--radius": theme.radius ?? "0.625rem",
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--card": theme.card,
    "--card-foreground": theme.cardForeground,
    "--popover": theme.popover,
    "--popover-foreground": theme.popoverForeground,
    "--primary": theme.primary,
    "--primary-foreground": theme.primaryForeground,
    "--secondary": theme.secondary,
    "--secondary-foreground": theme.secondaryForeground,
    "--muted": theme.muted,
    "--muted-foreground": theme.mutedForeground,
    "--accent": theme.accent,
    "--accent-foreground": theme.accentForeground,
    "--destructive": theme.destructive,
    "--destructive-foreground": theme.destructiveForeground,
    "--border": theme.border,
    "--input": theme.input,
    "--ring": theme.ring,
    ...(theme.chart1 && { "--chart-1": theme.chart1 }),
    ...(theme.chart2 && { "--chart-2": theme.chart2 }),
    ...(theme.chart3 && { "--chart-3": theme.chart3 }),
    ...(theme.chart4 && { "--chart-4": theme.chart4 }),
    ...(theme.chart5 && { "--chart-5": theme.chart5 }),
    ...(theme.sidebar && { "--sidebar": theme.sidebar }),
    ...(theme.sidebarForeground && {
      "--sidebar-foreground": theme.sidebarForeground,
    }),
    ...(theme.sidebarPrimary && { "--sidebar-primary": theme.sidebarPrimary }),
    ...(theme.sidebarPrimaryForeground && {
      "--sidebar-primary-foreground": theme.sidebarPrimaryForeground,
    }),
    ...(theme.sidebarAccent && { "--sidebar-accent": theme.sidebarAccent }),
    ...(theme.sidebarAccentForeground && {
      "--sidebar-accent-foreground": theme.sidebarAccentForeground,
    }),
    ...(theme.sidebarBorder && { "--sidebar-border": theme.sidebarBorder }),
    ...(theme.sidebarRing && { "--sidebar-ring": theme.sidebarRing }),
  } as React.CSSProperties;

  return (
    <div style={style} className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
