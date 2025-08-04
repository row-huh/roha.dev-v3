// app/writing/ClientWritingPage.tsx
"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import InteractiveBackground from "@/components/interactive-background"
import type { BlogPostMetadata } from "@/lib/blog"

export default function ClientWritingPage({ posts }: { posts: BlogPostMetadata[] }) {
  const pathname = usePathname()
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <InteractiveBackground />
      {/* Render your posts here */}
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  )
}
