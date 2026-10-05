"use client"

import { useEffect, useRef, useState, useId } from "react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  title: string
  description: string
  date: string
  image?: string
  link: string
  logos?: string[]
}

interface BlogsCarouselProps {
  posts?: BlogPost[]
}

// Contract
// - Inputs: up to 5 BlogPost items (fetched if not provided): 1 featured + 4 secondary
// - Output: responsive grid with sticky featured left, scrollable list right
// - Behavior: hover zoom on images, full-card link overlay, featured pinned while the list glides past
export default function BlogsCarousel({ posts }: BlogsCarouselProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  // Decorative SVG overlay used on cards
  const PatternOverlay = ({ variant }: { variant: "stars" | "lines" | "grid" | "dots" }) => {
    // Ensure unique IDs per instance to avoid collisions in <defs>
    const rawId = useId()
    // Strip potential ':' characters (React may include them) for URL fragment safety
    const uid = rawId.replace(/:/g, "")
    if (variant === "stars") {
      return (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-20 mix-blend-screen" viewBox="0 0 200 200">
          <defs>
            <radialGradient id={`starGrad-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <pattern id={`starsPattern-${uid}`} width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="10" r="0.8" fill={`url(#starGrad-${uid})`} />
              <circle cx="22" cy="28" r="1.2" fill={`url(#starGrad-${uid})`} />
              <circle cx="40" cy="14" r="0.6" fill={`url(#starGrad-${uid})`} />
              <circle cx="12" cy="38" r="0.7" fill={`url(#starGrad-${uid})`} />
              <circle cx="34" cy="42" r="0.9" fill={`url(#starGrad-${uid})`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#starsPattern-${uid})`} />
        </svg>
      )
    }
    if (variant === "lines") {
      return (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-15 mix-blend-overlay" viewBox="0 0 100 100">
          <defs>
            <pattern id={`diagLines-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeOpacity="0.35" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#diagLines-${uid})`} />
        </svg>
      )
    }
    if (variant === "grid") {
      return (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-15 mix-blend-overlay" viewBox="0 0 100 100">
          <defs>
            <pattern id={`gridPattern-${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#gridPattern-${uid})`} />
        </svg>
      )
    }
    // dots
    return (
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-20 mix-blend-overlay" viewBox="0 0 100 100">
        <defs>
          <pattern id={`dotPattern-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="white" fillOpacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dotPattern-${uid})`} />
      </svg>
    )
  }

  useEffect(() => {
    if (posts && posts.length) return
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch("/api/posts?limit=5", { cache: "no-store" })
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

  // Scroll-linked pin. The grid sticks under the nav while the page keeps scrolling natively
  // through pinRef's extra height; that scroll progress slides the right-hand list.
  const pinRef = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const itemCount = (posts ?? blogPosts).length

  useEffect(() => {
    const pin = pinRef.current
    const sticky = stickyRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!pin || !sticky || !viewport || !track) return

    // Matches lg:top-24 (6rem)
    const STICKY_TOP = 96
    // Page pixels scrolled per pixel the list moves. Higher = slower, calmer list.
    const SCROLL_DISTANCE = 1.3
    // Time constant (ms) of the easing towards the scroll position. Higher = more glide.
    const SMOOTHING = 160

    const desktop = window.matchMedia("(min-width: 1024px)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    let overflow = 0
    let current = 0
    let target = 0
    let raf: number | null = null
    let lastTime = 0

    const apply = () => {
      track.style.transform = `translate3d(0, ${-current}px, 0)`
    }

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 64)
      lastTime = now
      const delta = target - current
      if (Math.abs(delta) < 0.1) {
        current = target
        apply()
        raf = null
        return
      }
      // Exponential ease, independent of frame rate
      current += delta * (1 - Math.exp(-dt / SMOOTHING))
      apply()
      raf = requestAnimationFrame(tick)
    }

    const update = () => {
      if (!desktop.matches) return
      const range = pin.offsetHeight - sticky.offsetHeight
      const scrolled = STICKY_TOP - pin.getBoundingClientRect().top
      const progress = range > 0 ? Math.min(Math.max(scrolled / range, 0), 1) : 0
      target = progress * overflow

      if (reducedMotion.matches) {
        current = target
        apply()
      } else if (raf == null) {
        lastTime = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }

    const measure = () => {
      if (!desktop.matches) {
        // Small screens: plain stacked layout, nothing pinned
        pin.style.height = ""
        track.style.transform = ""
        current = target = 0
        return
      }
      overflow = Math.max(track.scrollHeight - viewport.clientHeight, 0)
      pin.style.height = `${sticky.offsetHeight + overflow * SCROLL_DISTANCE}px`
      update()
    }

    const observer = new ResizeObserver(measure)
    observer.observe(sticky)
    observer.observe(track)

    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", measure)
    measure()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", measure)
      if (raf != null) cancelAnimationFrame(raf)
    }
  }, [itemCount])

  const items = posts ?? blogPosts
  if (!items || items.length === 0) return null

  const featured = items[0]
  const secondary = items.slice(1, 5)
  // Overlay assets expected in /public/overlays
  // big: /public/overlays/overlay-big.jpg (for featured)
  // small variants: overlay-1.jpg, overlay-2.jpg, overlay-3.jpg for secondary cards
  // If these files are missing, overlays simply won't render.

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
            <h2 className="text-4xl font-medium text-white mb-6">Latest Insights</h2>
            <p className="text-lg text-gray-400 mb-12">
              I write a lot but only a fraction makes it online. 
              Catch up on the latest updates;
            </p>
        {/* pinRef gets extra height on lg (set in the effect); the grid sticks inside it while that height scrolls by */}
        <div ref={pinRef}>
        {/* Grid Setup: 4 cols on lg, single on small; responsive gap */}
        <div ref={stickyRef} className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 lg:sticky lg:top-24">
          {/* Left: Featured (spans 3) */}
          <div className="lg:col-span-3 lg:self-start">
            <article className="group relative">
                <div
                  className="relative overflow-hidden rounded-md shadow-md isolate cursor-pointer"
                  role="link"
                  aria-label={featured.title}
                  tabIndex={0}
                  onClick={() => window.open(featured.link, "_blank", "noopener,noreferrer")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      window.open(featured.link, "_blank", "noopener,noreferrer")
                    }
                  }}
                >
                {/* Mobile ratio */}
                <div className="relative block md:hidden aspect-4/5">
                  <Image
                    src="/overlays/green/featured.jpg"
                    alt={featured.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.025]"
                  />
                </div>
                {/* Desktop ratio */}
                <div className="relative hidden md:block aspect-video">
                  <Image
                    src="/overlays/green/featured.jpg"
                    alt={featured.title}
                    fill
                    priority
                    sizes="(min-width: 1280px) 900px, (min-width: 1024px) 75vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.025]"
                  />
                </div>
                {/* Featured overlays: color wash + dark gradient + ring */}
                {/* Removed gradient/ring overlays per request: only base image + pattern + overlay image remain */}
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

          {/* Secondary cards: small two-column tiles under the featured post on phones and tablets,
              a programmatically scrolled column beside the sticky featured post on large screens */}
          {/* Right: clipped window on lg; the track inside is moved by transform, with a soft fade where cards leave */}
          <div
            ref={viewportRef}
            className="lg:col-span-1 lg:h-[min(600px,calc(100vh-8rem))] lg:overflow-hidden lg:pr-2 lg:[mask-image:linear-gradient(to_bottom,black_calc(100%-56px),transparent)]"
          >
          <div
            ref={trackRef}
            className="grid grid-cols-2 gap-4 sm:gap-6 lg:flex lg:flex-col lg:gap-8 lg:will-change-transform"
          >
            {secondary.map((post, i) => {
              const overlays = [
                "bg-linear-to-br from-moss-400/25 via-moss-500/20 to-transparent",
                "bg-linear-to-br from-moss-500/25 via-moss-600/20 to-transparent",
                "bg-linear-to-br from-moss-300/25 via-moss-500/20 to-transparent",
              ]
              const colorOverlay = overlays[i % overlays.length]
              const overlayImage = `/overlays/green/side_${(i % 3) + 1}.jpg`
              return (
              <article key={i} className="group relative">
                  <div
                    className="relative overflow-hidden rounded-md isolate cursor-pointer"
                    role="link"
                    aria-label={post.title}
                    tabIndex={0}
                    onClick={() => window.open(post.link, "_blank", "noopener,noreferrer")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        window.open(post.link, "_blank", "noopener,noreferrer")
                      }
                    }}
                  >
                  {/* Mobile square */}
                  <div className="relative block md:hidden aspect-square">
                    <Image
                      src={overlayImage}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.0125]"
                    />
                  </div>
                  {/* Desktop: make card a bit more square */}
                    <div className="relative hidden md:block aspect-square">
                    <Image
                      src={overlayImage}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 320px, (min-width: 1024px) 25vw, 100vw"
                      className="object-cover transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.02]"
                    />
                  </div>
                  {/* Removed colored/dark/ring overlays per request */}
                  </div>

                <div className="mt-3 space-y-1">
                  <h4 className="text-sm sm:text-base lg:text-xl font-medium leading-snug line-clamp-3 lg:line-clamp-none">
                    <Link
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-block after:content-[''] after:absolute after:inset-0"
                      aria-label={post.title}
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                  <p className="hidden lg:block text-sm text-foreground/80">{post.description}</p>
                </div>
              </article>
            )})}
          </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
