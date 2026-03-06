import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "EventUp Scanner - Fast Check-In for Your Event",
  description: "Scan QR codes and check in guests instantly with EventUp's mobile scanner app. Works offline, no Wi-Fi required.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "EventUp Scanner - Fast Check-In",
    description: "Scan QR codes and check in guests instantly. Works offline, no Wi-Fi required.",
    url: "https://eventup.lk/scanner",
    siteName: "EventUp",
    images: [
      {
        url: "/images/eventup-logo-full.svg",
        width: 1200,
        height: 630,
        alt: "EventUp Scanner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventUp Scanner - Fast Check-In",
    description: "Scan QR codes and check in guests instantly. Works offline, no Wi-Fi required.",
    images: [{ url: "/images/eventup-logo-full.svg", alt: "EventUp Scanner", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>{children}</Providers>
      </body>
      
    </html>
  )
}
