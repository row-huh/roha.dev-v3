"use client"

import { useEffect, useState } from "react"
import { ZoomIn, ZoomOut, ExternalLink } from "lucide-react"

interface PostContent {
  title: string
  date: string
  category: string
  contentHtml: string
}

export default function PdfViewer({ slug }: { slug: string }) {
  const [post, setPost] = useState<PostContent | null>(null)
  const [error, setError] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    let alive = true
    fetch(`/api/posts/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => alive && setPost(data))
      .catch(() => alive && setError(true))
    return () => {
      alive = false
    }
  }, [slug])

  return (
    <div className="os-pixel flex h-full flex-col bg-[#cdbb93]">
      {/* reader toolbar */}
      <div className="flex items-center justify-between gap-2 border-b-2 border-[#2f2616] bg-[#d8c39a] px-3 py-1.5 text-[12px] text-[#3b2f1e]">
        <span className="truncate">{post ? `${slug}.md` : "Loading…"}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))}
            className="rounded-none border-2 border-[#2f2616] bg-[#ece6d6] p-1 hover:bg-[#e6dcc2]"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <span className="w-10 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(2)))}
            className="rounded-none border-2 border-[#2f2616] bg-[#ece6d6] p-1 hover:bg-[#e6dcc2]"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <a
            href={`/writing/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-none border-2 border-[#2f2616] bg-[#ece6d6] p-1 hover:bg-[#e6dcc2]"
            aria-label="Open original"
            title="Open original page"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* document scroll area */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
        {error && (
          <div className="os-shadow mx-auto max-w-md rounded-none border-2 border-[#2f2616] bg-[#fbf7ec] p-8 text-center text-[13px] text-[#6b5b43]">
            Could not load this document.
          </div>
        )}

        {!post && !error && (
          <div className="os-shadow mx-auto h-full max-w-[640px] animate-pulse rounded-none border-2 border-[#2f2616] bg-[#fbf7ec]/80" />
        )}

        {post && (
          <div
            className="os-shadow mx-auto origin-top rounded-none border-2 border-[#2f2616] bg-[#fbf7ec] text-[#3b2f1e]"
            style={{ maxWidth: 640, transform: `scale(${zoom})`, transformOrigin: "top center" }}
          >
            {/* page sheet */}
            <article className="px-8 py-10 font-sans sm:px-12 sm:py-14">
              <div className="os-pixel mb-1 text-[11px] uppercase tracking-wide text-[#a8552e]">
                {post.category?.replace(/-/g, " ")}
              </div>
              <h1 className="font-sans text-2xl font-bold leading-tight text-[#2f2616]">
                {post.title}
              </h1>
              <div className="mt-1 text-xs text-[#8b7a55]">{post.date}</div>
              <hr className="my-5 border-[#2f2616]/20" />
              <div
                className="pdf-prose text-[15px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </article>
          </div>
        )}
      </div>
    </div>
  )
}
