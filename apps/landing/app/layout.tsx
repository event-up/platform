import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eventup - Event Attendance Management Platform",
  description: "Effortless registration and real-time attendance monitoring for any event, any size. Level up your event with Eventup.",
  keywords: ["event management", "attendance tracking", "QR check-in", "event registration", "event platform"],
  authors: [{ name: "Eventup" }],
  openGraph: {
    title: "Eventup - Level up your event",
    description: "Effortless registration and real-time attendance monitoring for any event, any size.",
    url: "https://eventup.com",
    siteName: "Eventup",
    images: [
      {
        url: "/images/eventup-logo-full.svg",
        width: 1200,
        height: 630,
        alt: "Eventup Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventup - Level up your event",
    description: "Effortless registration and real-time attendance monitoring for any event, any size.",
    images: ["/images/eventup-logo-full.svg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
