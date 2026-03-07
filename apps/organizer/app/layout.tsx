import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Toaster } from "sonner";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "EventUp Organizer - Event Management Dashboard",
  description:
    "Manage events, track registrations, and monitor check-ins in real-time with EventUp's organizer dashboard.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EventUp Organizer - Event Management Dashboard",
    description:
      "Manage events, track registrations, and monitor check-ins in real-time.",
    url: "https://eventup.lk/organizer",
    siteName: "EventUp",
    images: [
      {
        url: "https://eventup.lk/images/eventup-logo-full.svg",
        width: 1200,
        height: 630,
        alt: "EventUp Organizer Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventUp Organizer - Event Management Dashboard",
    description:
      "Manage events, track registrations, and monitor check-ins in real-time.",
    images: [
      {
        url: "/images/eventup-logo-full.svg",
        alt: "EventUp Organizer",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
