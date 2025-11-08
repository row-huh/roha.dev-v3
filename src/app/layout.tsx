import type React from "react"
import type { Metadata } from "next"
import { Inter, Oswald } from "next/font/google" // Import Oswald
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" }) // Define Oswald font

export const metadata: Metadata = {
  title: "Roha - AI Engineer & Fullstack Developer",
  description:
    "Fullstack developer diving into AI engineering and deep learning. Enthusiastic about building intelligent applications.",
  // Used to make Open Graph/Twitter image URLs absolute when pages specify relative paths
  metadataBase: new URL("https://roha.dev"),
  openGraph: {
    title: "Roha - AI Engineer & Fullstack Developer",
    description:
      "Fullstack developer diving into AI engineering and deep learning. Enthusiastic about building intelligent applications.",
    url: "https://roha.dev",
    siteName: "Roha.dev",
    images: [
      {
        url: "/overlays/overlay-big.jpg",
        width: 1200,
        height: 630,
        alt: "Roha - AI Engineer & Fullstack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roha - AI Engineer & Fullstack Developer",
    description:
      "Fullstack developer diving into AI engineering and deep learning. Enthusiastic about building intelligent applications.",
    images: ["/overlays/overlay-big.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Roha - AI Engineer & Fullstack Developer" />
        <meta property="og:description" content="Fullstack developer diving into AI engineering and deep learning. Enthusiastic about building intelligent applications." />
        <meta property="og:image" content="https://roha.dev/overlays/overlay-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Roha - AI Engineer & Fullstack Developer" />
        <meta property="og:url" content="https://roha.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Roha.dev" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Roha - AI Engineer & Fullstack Developer" />
        <meta name="twitter:description" content="Fullstack developer diving into AI engineering and deep learning. Enthusiastic about building intelligent applications." />
        <meta name="twitter:image" content="https://roha.dev/overlays/overlay-og.jpg" />
        <meta name="twitter:image:alt" content="Roha - AI Engineer & Fullstack Developer" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
