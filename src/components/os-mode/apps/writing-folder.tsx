"use client"

import { useEffect, useState } from "react"
import { ScrollText } from "lucide-react"

interface PostItem {
  slug: string
  title: string
  date: string
  category: string
}

export default function WritingFolder({
  onOpenPost,
}: {
  onOpenPost: (slug: string, title: string) => void
}) {
  const [posts, setPosts] = useState<PostItem[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true
    fetch("/api/posts?limit=12")
      .then((r) => r.json())
      .then((data) => {
        if (alive) setPosts(data)
      })
      .catch(() => alive && setError(true))
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="os-pixel flex h-full flex-col text-[#3b2f1e]">
      <div className="flex items-center justify-between border-b-2 border-[#2f2616] bg-[#e0d4b6] px-4 py-2 text-[12px] text-[#6b5b43]">
        <span>{posts ? `${posts.length} scrolls` : "Loading…"}</span>
        <span className="hidden sm:inline">~/writing</span>
      </div>

      {error && <div className="p-6 text-[13px] text-[#6b5b43]">Couldn&apos;t load documents.</div>}

      <div className="grid flex-1 auto-rows-min grid-cols-3 gap-1 overflow-y-auto p-3 sm:grid-cols-4">
        {!posts &&
          !error &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-2">
              <div className="h-10 w-8 animate-pulse rounded-none border-2 border-[#2f2616]/30 bg-[#dcd0b2]" />
              <div className="h-2 w-12 animate-pulse bg-[#dcd0b2]" />
            </div>
          ))}

        {posts?.map((p) => (
          <button
            key={p.slug}
            onDoubleClick={() => onOpenPost(p.slug, p.title)}
            onClick={(e) => {
              if (e.detail === 1) onOpenPost(p.slug, p.title)
            }}
            className="flex flex-col items-center gap-1.5 rounded-none border-2 border-transparent p-2 text-center transition-colors hover:border-[#2f2616] hover:bg-[#f3eedd]"
          >
            <div className="relative">
              <ScrollText className="h-10 w-10 text-[#a8552e]" strokeWidth={1.5} />
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-none border border-[#2f2616] bg-[#c2703d] px-1 text-[7px] font-bold text-[#2f2616]">
                MD
              </span>
            </div>
            <span className="line-clamp-2 text-[11px] leading-tight text-[#5a4a32]">{p.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
