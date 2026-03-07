import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";

import "@workspace/ui/globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "EventUp - Event Invitation & Check-In",
  description: "View your event invitation, QR code, and check-in status. Powered by EventUp.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "EventUp - Your Event Invitation",
    description: "View your event invitation, QR code, and check-in status.",
    url: "https://eventup.lk",
    siteName: "EventUp",
    images: [
      {
        url: "/images/eventup-logo-full.svg",
        width: 1200,
        height: 630,
        alt: "EventUp Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventUp - Your Event Invitation",
    description: "View your event invitation, QR code, and check-in status.",
    images: [{ url: "/images/eventup-logo-full.svg", alt: "EventUp", width: 1200, height: 630 }],
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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
