"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useChat } from "@ai-sdk/react"
import { useSearchParams } from "next/navigation"
import AnimatedBackground from "@/components/interactive-background"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, StopCircle, Home, Briefcase, PenLine, Mail, ChevronRight } from "lucide-react"
import { projectDetails } from "@/app/projects/[slug]/projectDetails"
import InteractiveBackground from "@/components/interactive-background"

type ToolName = "home" | "work" | "writing" | "contact" | undefined

function extractMessageText(m: any): string {
  if (typeof m?.content === "string") return m.content
  if (Array.isArray(m?.parts)) {
    return m.parts
      .filter((p: any) => p?.type === "text")
      .map((p: any) => p.text)
      .join("")
      .trim()
  }
  return ""
}

function toolMeta(tool: Exclude<ToolName, undefined>) {
  switch (tool) {
    case "home":
      return { href: "/", eyebrow: "Navigate", label: "Home", Icon: Home }
    case "work":
      return { href: "/projects", eyebrow: "Explore", label: "Work", Icon: Briefcase }
    case "writing":
      return { href: "/writing", eyebrow: "Read", label: "Writing", Icon: PenLine }
    case "contact":
      return { href: "/contact", eyebrow: "Reach Out", label: "Contact", Icon: Mail }
  }
}

/**
 * Parse optional model hint like "<tool:work>" (case-insensitive).
 * Returns { cleanedText, tool } where "cleanedText" has the tag removed.
 */
function extractToolTag(text: string): { cleanedText: string; tool: ToolName } {
  const re = /<\s*tool\s*:\s*(home|work|writing|contact)\s*>/i
  const match = text.match(re)
  if (!match) return { cleanedText: text, tool: undefined }
  const tool = match[1].toLowerCase() as Exclude<ToolName, undefined>
  const cleanedText = text.replace(re, "").trim()
  return { cleanedText, tool }
}

/**
 * Convert raw text into clickable links for:
 * - absolute URLs (https://...)
 * - internal posts (/writing/slug)
 * - internal projects (/projects/slug)
 */
function renderWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+|\/writing\/[a-z0-9-]+|\/projects\/[a-z0-9-]+)/gi
  const parts = text.split(urlRegex)

  return parts.map((part, i) => {
    if (!part) return <span key={i} />
    if (part.match(urlRegex)) {
      const isExternal = part.startsWith("http")
      return (
        <a
          key={i}
          href={part}
          className="underline underline-offset-4 text-white hover:text-white/90 break-all"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {part}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

/**
 * Extract unique internal links from a text: /projects/{slug} and /writing/{slug}
 */
function extractInternalLinks(text: string): Array<{ kind: "projects" | "writing"; slug: string; href: string }> {
  const re = /(\/(projects|writing)\/([a-z0-9-]+))/gi
  const list: Array<{ kind: "projects" | "writing"; slug: string; href: string }> = []
  const seen = new Set<string>()
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const href = m[1]
    const kind = m[2] as "projects" | "writing"
    const slug = m[3]
    const key = `${kind}:${slug}`
    if (!seen.has(key)) {
      seen.add(key)
      list.push({ kind, slug, href })
    }
  }
  return list
}

/**
 * Generic tall glassy tile used for navigation suggestions
 */
function ToolTile({ tool }: { tool: Exclude<ToolName, undefined> }) {
  const meta = toolMeta(tool)
  if (!meta) return null
  const { href, eyebrow, label, Icon } = meta

  return (
    <Link
      href={href}
      className="group relative block w-[220px] md:w-[260px] overflow-hidden rounded-2xl
                 ring-1 ring-white/15
                 bg-gradient-to-b from-white/[0.10] via-white/[0.06] to-white/[0.03]
                 [background-image:radial-gradient(120%_80%_at_50%_0%,rgba(168,85,247,0.35),rgba(236,72,153,0.20)_40%,rgba(6,182,212,0.15)_70%,rgba(0,0,0,0)_100%)]
                 backdrop-blur-xl"
      aria-label={label}
    >
      <div className="flex h-44 flex-col justify-between p-4 md:h-52">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-white/75">{eyebrow}</p>
          <div className="mt-1 flex items-center gap-2">
            <Icon className="h-4 w-4 text-white" />
            <h3 className="text-lg font-semibold text-white">{label}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.10] ring-1 ring-white/15 backdrop-blur-md">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <ChevronRight
            className="h-4 w-4 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
        <div className="absolute inset-0 rounded-2xl bg-white/5" />
      </div>
    </Link>
  )
}

/**
 * Card for specific internal links like /projects/{slug} and /writing/{slug}
 * Matches the look+feel of ToolTile but with item-specific label.
 */
function LinkTile({ href, kind, slug }: { href: string; kind: "projects" | "writing"; slug: string }) {
  const isProject = kind === "projects"
  const Icon = isProject ? Briefcase : PenLine

  // Project title from local details, else humanize slug
  const humanize = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  const projectTitle = isProject ? (projectDetails as any)?.[slug]?.title : undefined
  const label = isProject ? projectTitle || humanize(slug) : humanize(slug)
  const eyebrow = isProject ? "Project" : "Post"

  return (
    <Link
      href={href}
      className="group relative block w-[220px] md:w-[260px] overflow-hidden rounded-2xl
                 ring-1 ring-white/15
                 bg-gradient-to-b from-white/[0.10] via-white/[0.06] to-white/[0.03]
                 [background-image:radial-gradient(120%_80%_at_50%_0%,rgba(168,85,247,0.35),rgba(236,72,153,0.20)_40%,rgba(6,182,212,0.15)_70%,rgba(0,0,0,0)_100%)]
                 backdrop-blur-xl"
      aria-label={label}
    >
      <div className="flex h-44 flex-col justify-between p-4 md:h-52">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-white/75">{eyebrow}</p>
          <div className="mt-1 flex items-center gap-2">
            <Icon className="h-4 w-4 text-white" />
            <h3 className="text-lg font-semibold text-white line-clamp-2">{label}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.10] ring-1 ring-white/15 backdrop-blur-md">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <ChevronRight
            className="h-4 w-4 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
        <div className="absolute inset-0 rounded-2xl bg-white/5" />
      </div>
    </Link>
  )
}

export default function AssistantPage() {
  const searchParams = useSearchParams()
  const { messages, sendMessage, stop, error, status } = useChat({
    api: "/api/chat",
  })

  const [input, setInput] = useState("")
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const isActive = hasStartedChat || messages.length > 0
  const isStreaming = status === "submitted" || status === "streaming"

  // Prefill from sessionStorage or URL on first load, optionally auto-send
  useEffect(() => {
    const stored = (typeof window !== "undefined" && sessionStorage.getItem("pethia:initial")) || ""
    const urlQ = searchParams?.get("q") || ""
    const draft = stored || urlQ

    if (draft) setInput(draft)

    const autoFromStore = typeof window !== "undefined" && sessionStorage.getItem("pethia:auto") === "1"
    const autoFromUrl = searchParams?.get("auto") === "1"
    const shouldAuto = !!draft && (autoFromStore || autoFromUrl)

    if (shouldAuto) {
      if (typeof window !== "undefined") sessionStorage.removeItem("pethia:auto")
      setHasStartedChat(true)
      setTimeout(() => {
        sendMessage({ text: draft })
        setInput("")
      }, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, status])

  const suggestions = useMemo(
    () => ["Show me recent projects", "What’s the latest post?", "What are you working on now?"],
    [],
  )

  const handleSend = (text?: string) => {
    const payload = (text ?? input).trim()
    if (!payload || isStreaming) return
    sendMessage({ text: payload })
    setInput("")
    setHasStartedChat(true)
  }

  return (
    <div className="relative min-h-screen text-gray-100">
      <InteractiveBackground />

      {/* Minimal nav link */}
      <header className="relative z-10">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-gray-200/80 hover:text-white transition-all duration-200"
            aria-label="Go back"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.08] ring-1 ring-white/10 backdrop-blur-sm transition-all duration-200 group-hover:bg-white/[0.12] group-hover:ring-white/20">
              <svg
                className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white/60 transition-colors duration-200">
              Go back
            </span>
          </Link>
        </div>
      </header>

      {!isActive ? (
        // IDLE STATE
        <main className="relative z-10">
          <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-4 text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Ask me anything about Roha
            </h1>

            <div className="mt-2 w-full max-w-xl">
              <div className="rounded-2xl ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-xl p-1.5">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, latest post, Spotify…"
                  className="h-12 rounded-xl border-white/10 bg-white/[0.06] text-gray-100 placeholder:text-gray-300/70
                             focus-visible:ring-purple-500/60"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="rounded-full px-3 py-1 text-xs text-gray-100
                               ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-md
                               hover:bg-white/[0.08] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : (
        // ACTIVE STATE
        <main className="relative z-10">
          <div className="mx-auto flex min-h-[calc(100vh-52px)] max-w-3xl flex-col px-4">
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-6">
                {messages.map((m) => {
                  const isUser = m.role === "user"
                  const rawText = extractMessageText(m)
                  const { cleanedText, tool } = !isUser
                    ? extractToolTag(rawText)
                    : { cleanedText: rawText, tool: undefined }

                  // Extract internal links for assistant messages to render link tiles
                  const internalLinks = !isUser ? extractInternalLinks(cleanedText) : []

                  return (
                    <div key={m.id} className="space-y-3">
                      <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-xl px-3 py-2 text-[15px] leading-relaxed
                                      ring-1 backdrop-blur-md ${
                                        isUser
                                          ? "ml-auto ring-white/15 bg-white/[0.10] text-white"
                                          : "mr-auto ring-white/12 bg-white/[0.06] text-gray-100"
                                      }`}
                        >
                          <div className="whitespace-pre-wrap break-words">{renderWithLinks(cleanedText)}</div>
                        </div>
                      </div>

                      {/* Link tiles for specific items (e.g., /projects/slug, /writing/slug) */}
                      {!isUser && internalLinks.length > 0 && (
                        <div className="flex w-full flex-wrap gap-3 pl-1">
                          {internalLinks.map((l) => (
                            <LinkTile key={`${l.kind}:${l.slug}`} href={l.href} kind={l.kind} slug={l.slug} />
                          ))}
                        </div>
                      )}

                      {/* Only show when the model suggested a general navigation */}
                      {!isUser && tool && (
                        <div className="flex w-full justify-start pl-1">
                          <ToolTile tool={tool} />
                        </div>
                      )}
                    </div>
                  )
                })}

                {status !== "ready" && (
                  <div className="flex items-start">
                    <div className="mr-auto max-w-[85%] rounded-xl px-3 py-2 text-[15px] text-gray-100 ring-1 ring-white/12 bg-white/[0.06] backdrop-blur-md">
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-purple-300" />
                        <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-purple-300 [animation-delay:150ms]" />
                        <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-purple-300 [animation-delay:300ms]" />
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-md ring-1 ring-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                    {String(error)}
                  </div>
                )}

                <div ref={endRef} />
              </div>
            </div>

            {/* Bottom composer */}
            <div className="sticky bottom-0 pb-4">
              <div className="rounded-2xl ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-xl px-3 py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write your message…"
                    className="h-11 flex-1 rounded-xl border-white/10 bg-white/[0.06] text-gray-100 placeholder:text-gray-300/70
                               focus-visible:ring-purple-500/60"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                  />
                  {isStreaming ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => stop()}
                      className="h-11 rounded-xl ring-1 ring-white/15 bg-white/[0.06] text-white hover:bg-white/[0.08]"
                      aria-label="Stop streaming"
                    >
                      <StopCircle className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="h-11 rounded-xl bg-purple-600 px-4 text-white hover:bg-purple-500 disabled:opacity-50"
                      aria-label="Send"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="rounded-full px-3 py-1 text-xs text-gray-100 ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-md hover:bg-white/[0.08] transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
