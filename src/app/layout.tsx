import type React from "react"
import type { Metadata } from "next"
import { Inter, Pixelify_Sans, Bebas_Neue } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const pixelifySans = Pixelify_Sans({ subsets: ["latin"], variable: "--font-pixelify" })
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas-neue" })

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
    <html lang="en" className={`${inter.variable} ${pixelifySans.variable} ${bebasNeue.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Apply saved theme before paint to avoid a flash (defaults to dark) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);}catch(e){}})();`,
          }}
        />
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
