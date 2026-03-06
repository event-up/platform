import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Script from "next/script";
import AnalyticsTracker from "./AnalyticsTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EventUp - Event Attendance Management Platform",
  description: "Effortless registration and real-time attendance monitoring for any event, any size. Level up your event with EventUp.",
  keywords: ["event management", "attendance tracking", "QR check-in", "event registration", "event platform"],
  authors: [{ name: "EventUp" }],
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://eventup.lk'),
  openGraph: {
    title: "EventUp - Level up your event",
    description: "Effortless registration and real-time attendance monitoring for any event, any size.",
    url: "https://eventup.lk",
    siteName: "EventUp",
    images: [
      {
        url: "/images/eventup-logo-full.svg",
        width: 1200,
        height: 630,
        alt: "EventUp - Event Attendance Management Platform",
        type: "image/svg+xml",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventUp - Level up your event",
    description: "Effortless registration and real-time attendance monitoring for any event, any size.",
    images: [{ url: "/images/eventup-logo-full.svg", alt: "EventUp Logo", width: 1200, height: 630 }],
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
      <head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MD9R6R04MK"></Script>
      <Script id="google-analytics" strategy="afterInteractive" >
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-MD9R6R04MK');`}
      </Script> 
      <Script id="analytics-click-tracking" strategy="afterInteractive">
        {`
          document.addEventListener("click", function (e) {
            const el = e.target.closest("[data-analytics]");
            if (!el) return;

            const event = el.getAttribute("data-analytics");

            window.gtag?.("event", event);
          });
        `}
      </Script>


      </head>
      <body className={`${inter.variable} ${caveat.variable} antialiased`}>
        <Navigation />
        <AnalyticsTracker />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
