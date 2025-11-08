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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
