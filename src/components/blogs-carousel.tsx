"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  title: string
  description: string
  date: string
  image: string
  link: string
  logos?: string[]
}

interface BlogsCarouselProps {
  posts?: BlogPost[]
}

// Contract
// - Inputs: up to 4 BlogPost items (fetched if not provided)
// - Output: responsive grid with sticky featured left, scrollable list right
// - Behavior: hover zoom on images, full-card link overlay, smooth sticky top
export default function BlogsCarousel({ posts }: BlogsCarouselProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  // Decorative SVG overlay used on cards
  const PatternOverlay = ({ variant }: { variant: "stars" | "lines" | "grid" | "dots" }) => {
    if (variant === "stars") {
      return (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-20 mix-blend-screen" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <pattern id="starsPattern" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="10" r="0.8" fill="url(#starGrad)" />
              <circle cx="22" cy="28" r="1.2" fill="url(#starGrad)" />
              <circle cx="40" cy="14" r="0.6" fill="url(#starGrad)" />
              <circle cx="12" cy="38" r="0.7" fill="url(#starGrad)" />
              <circle cx="34" cy="42" r="0.9" fill="url(#starGrad)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#starsPattern)" />
        </svg>
      )
    }
    if (variant === "lines") {
      return (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-15 mix-blend-overlay" viewBox="0 0 100 100">
          <defs>
            <pattern id="diagLines" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeOpacity="0.35" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagLines)" />
        </svg>
      )
    }
    if (variant === "grid") {
      return (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-15 mix-blend-overlay" viewBox="0 0 100 100">
          <defs>
            <pattern id="gridPattern" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      )
    }
    // dots
    return (
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-20 mix-blend-overlay" viewBox="0 0 100 100">
        <defs>
          <pattern id="dotPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="white" fillOpacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>
    )
  }

  useEffect(() => {
    if (posts && posts.length) return
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch("/api/posts?limit=4", { cache: "no-store" })
        if (!res.ok) return
        const data: BlogPost[] = await res.json()
        if (!cancelled) setBlogPosts(data)
      } catch {
        // ignore
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [posts])

  // Refs for programmatic scroll sync (must be before any early returns to keep hook order stable)
  const sectionRef = useRef<HTMLElement | null>(null)
  const rightRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const targetScrollRef = useRef(0)
  const currentScrollRef = useRef(0)
  const isPinnedRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)
  
  // Tunables: reduce this to make the right column scroll more slowly
  // 0.20 = fast catch-up, 0.12 = default, 0.06 = slower
  const CATCH_UP_FACTOR = 0.06
  // Sticky offset in px for lg:top-24 (6rem)
  const STICKY_TOP_OFFSET = 96
  // Multiplier to control how much the right list moves per wheel/touch delta
  const SCROLL_MULTIPLIER = 0.6

  useEffect(() => {
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const computePinned = () => {
      if (!sectionRef.current) return false
      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      // Pinned when section top reaches sticky offset and bottom still below viewport
      return rect.top <= STICKY_TOP_OFFSET && rect.bottom >= viewportHeight
    }

    const startAnimationLoop = () => {
      if (rafRef.current != null) return
      const tick = () => {
        const el = rightRef.current
        if (!el) {
          rafRef.current = null
          return
        }
        const current = currentScrollRef.current
        const target = targetScrollRef.current
        const delta = target - current
        // Small threshold to stop animating
        if (Math.abs(delta) < 0.5) {
          currentScrollRef.current = target
          el.scrollTop = target
          rafRef.current = null
          return
        }
        // Smoothly approach target; smaller factor = slower perceived speed
        currentScrollRef.current = current + delta * CATCH_UP_FACTOR
        el.scrollTop = currentScrollRef.current
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      if (!sectionRef.current || !rightRef.current) return

      // Only sync on large screens where the left is sticky (approx >= 1024px)
      if (window.innerWidth < 1024) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const sectionHeight = sectionRef.current.offsetHeight
      const viewportHeight = window.innerHeight

  // Match sticky offset (lg:top-24 ~= 6rem = 96px)
  const topOffset = STICKY_TOP_OFFSET

      // Range where the left is effectively pinned
      const pinStart = sectionTop - topOffset
      const pinEnd = sectionTop + sectionHeight - viewportHeight
      const pinRange = Math.max(pinEnd - pinStart, 1)

      const y = window.scrollY
      // Progress of the pin phase [0..1]
      const tRaw = Math.min(Math.max((y - pinStart) / pinRange, 0), 1)
      // Apply smooth easing (feels slower and smoother)
      const t = easeInOutCubic(tRaw)

      const el = rightRef.current
      const maxScroll = el.scrollHeight - el.clientHeight

      // Update pinned state for wheel/touch handling
      isPinnedRef.current = computePinned()

      // While pinned, do NOT drive the right list from page scroll
      if (!isPinnedRef.current && maxScroll > 0) {
        targetScrollRef.current = t * maxScroll
        // Start the rAF loop if not running
        startAnimationLoop()
      }
    }

    const onResize = () => {
      // Keep currentScroll in bounds and re-evaluate target
      currentScrollRef.current = rightRef.current?.scrollTop ?? 0
      onScroll()
    }

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

    const scrollRightBy = (deltaY: number) => {
      const el = rightRef.current
      if (!el) return
      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll <= 0) return
      const next = clamp((targetScrollRef.current || el.scrollTop) + deltaY * SCROLL_MULTIPLIER, 0, maxScroll)
      targetScrollRef.current = next
      // Start or continue the rAF smoothing loop
      if (rafRef.current == null) startAnimationLoop()
    }

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return // don't hijack on small screens
      const pinned = computePinned()
      isPinnedRef.current = pinned
      if (!pinned) return

      const el = rightRef.current
      if (!el) return
      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll <= 0) return

      const dy = e.deltaY
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop >= maxScroll - 1

      // Allow page to move only when user tries to scroll past edges
      if ((atTop && dy < 0) || (atBottom && dy > 0)) {
        return
      }

      e.preventDefault()
      scrollRightBy(dy)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null
    }

    const onTouchMove = (e: TouchEvent) => {
      if (window.innerWidth < 1024) return
      const pinned = computePinned()
      isPinnedRef.current = pinned
      if (!pinned) return

      const startY = touchStartYRef.current
      if (startY == null) return
      const y = e.touches[0]?.clientY ?? startY
  const dy = startY - y

      const el = rightRef.current
      if (!el) return
      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll <= 0) return

      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop >= maxScroll - 1
      if ((atTop && dy < 0) || (atBottom && dy > 0)) {
        return
      }
      e.preventDefault()
      scrollRightBy(dy)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })

    // Initialize state
    currentScrollRef.current = rightRef.current?.scrollTop ?? 0
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const items = posts ?? blogPosts
  if (!items || items.length === 0) return null

  const featured = items[0]
  const secondary = items.slice(1, 4)

  return (
    <section ref={sectionRef} className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Grid Setup: 4 cols on lg, single on small; responsive gap */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left: Featured (spans 3) - Sticky + smooth top transition */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start transition-[top] duration-300">
            <article className="group relative">
              <div className="relative overflow-hidden rounded-md shadow-md">
                {/* Mobile ratio */}
                <div className="relative block md:hidden aspect-4/5">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.025]"
                  />
                  {/* Decorative pattern */}
                  <PatternOverlay variant="stars" />
                </div>
                {/* Desktop ratio */}
                <div className="relative hidden md:block aspect-video">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(min-width: 1280px) 900px, (min-width: 1024px) 75vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.025]"
                  />
                  {/* Decorative pattern */}
                  <PatternOverlay variant="stars" />
                </div>
                {/* Featured overlays: color wash + dark gradient + ring */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-linear-to-tr from-purple-500/25 via-indigo-500/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 rounded-md ring-1 ring-white/10 group-hover:ring-white/20 transition-colors duration-300" />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                  <Link
                    href={featured.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block after:content-[''] after:absolute after:inset-0"
                    aria-label={featured.title}
                  >
                    {featured.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{featured.date}</p>
                <p className="text-base text-foreground/80">{featured.description}</p>
              </div>
            </article>
          </div>

          {/* Right: Secondary cards (scroll beside sticky) */}
          {/* Right programmatic scroller: disable native wheel scroll so it follows page scroll */}
          <div
            ref={rightRef}
            className="lg:col-span-1 flex flex-col gap-8 lg:h-[600px] lg:overflow-hidden lg:pr-2"
            style={{ scrollBehavior: "auto" }}
          >
            {secondary.map((post, i) => {
              const overlays = [
                "bg-linear-to-br from-amber-400/25 via-orange-500/20 to-transparent",
                "bg-linear-to-br from-cyan-400/25 via-blue-500/20 to-transparent",
                "bg-linear-to-br from-pink-500/25 via-violet-500/20 to-transparent",
              ]
              const colorOverlay = overlays[i % overlays.length]
              return (
              <article key={i} className="group relative">
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block"
                  aria-label={post.title}
                >
                  <div className="relative overflow-hidden rounded-md shadow-sm">
                    {/* Mobile square */}
                    <div className="relative block md:hidden aspect-square">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.0125]"
                      />
                      {/* Decorative pattern */}
                      <PatternOverlay variant={i % 3 === 0 ? "lines" : i % 3 === 1 ? "grid" : "dots"} />
                    </div>
                    {/* Desktop: make card a bit more square */}
                    <div className="relative hidden md:block aspect-4/5">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1280px) 320px, (min-width: 1024px) 25vw, 100vw"
                        className="object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.02]"
                      />
                      {/* Decorative pattern */}
                      <PatternOverlay variant={i % 3 === 0 ? "lines" : i % 3 === 1 ? "grid" : "dots"} />
                    </div>
                    {/* Card overlays: per-card color + dark + ring */}
                    <div className="pointer-events-none absolute inset-0">
                      <div className={`absolute inset-0 ${colorOverlay} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-transparent" />
                      <div className="absolute inset-0 rounded-md ring-1 ring-white/10 group-hover:ring-white/20 transition-colors duration-300" />
                    </div>
                  </div>

                  <div className="mt-3 space-y-1">
                    <h4 className="text-lg sm:text-xl font-medium leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                    <p className="text-sm text-foreground/80">{post.description}</p>
                  </div>

                  {/* Full clickable overlay */}
                  <span className="pointer-events-none absolute inset-0 after:content-[''] after:absolute after:inset-0" />
                </Link>
              </article>
            )})}
          </div>
        </div>
      </div>
    </section>
  )
}
