"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  title: string
  description: string
  date: string
  image: string
  link: string
  logos?: string[] // optional array of logo image URLs
}

interface BlogsCarouselProps {
  posts?: BlogPost[] // make optional so the component can fetch if not passed
}

export default function BlogsCarousel({ posts }: BlogsCarouselProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    if (posts && posts.length > 0) return // skip fetch if already provided

    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch("/api/posts?limit=4", { cache: "no-store" })
        if (!res.ok) return
        const data: BlogPost[] = await res.json()
        if (!cancelled) setBlogPosts(data)
      } catch {
        // silently ignore for now
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [posts])

  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 2
      carouselRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const itemsToRender = posts ?? blogPosts

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto w-4/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-3 sm:mb-4">
            Latest Insights
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Dive into my thoughts on AI, development, and the future of technology.
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 gap-3 sm:gap-4"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#6b21a8 #1f2937",
            }}
          >
            {itemsToRender.map((post, index) => (
              <motion.div
                key={index}
                className="flex-none w-64 sm:w-72 md:w-80 snap-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden rounded-xl sm:rounded-2xl h-full flex flex-col border-0 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-purple-900/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-950/80 via-indigo-950/90 to-gray-950/95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-purple-950/40" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 via-indigo-900/0 to-black/0 group-hover:from-purple-900/60 group-hover:via-indigo-900/50 group-hover:to-black/40 transition-all duration-500" />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-500" />

                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 p-4 sm:p-5 flex flex-col h-full group-hover:transform-none"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg sm:text-xl font-semibold text-white leading-tight group-hover:text-purple-100 transition-colors duration-300 flex-1 pr-3">
                        {post.title}
                      </h4>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110 flex-shrink-0" />
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-3 group-hover:via-purple-400/70 transition-all duration-500" />

                    <p className="text-gray-300 group-hover:text-gray-200 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 flex-1 transition-colors duration-300">
                      {post.description}
                    </p>

                    <div className="mt-auto pt-3 border-t border-white/10 group-hover:border-purple-400/20 flex justify-between items-center transition-all duration-300">
                      <p className="text-xs text-gray-400 group-hover:text-purple-300 font-medium transition-colors duration-300">
                        {post.date}
                      </p>
                      {post.logos && post.logos.length > 0 && (
                        <div className="flex gap-1.5">
                          {post.logos.map((logo, i) => (
                            <div
                              key={i}
                              className="relative overflow-hidden rounded group-hover:scale-110 transition-transform duration-300"
                            >
                              <Image
                                src={logo}
                                alt="logo"
                                width={20}
                                height={20}
                                className="rounded border border-white/20 group-hover:border-purple-400/30 transition-all duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-900/90 border-purple-400/30 backdrop-blur-md text-purple-300 hover:bg-purple-900/60 hover:text-white hover:border-purple-400/50 rounded-full z-20 flex transition-all duration-300 hover:scale-110"
            onClick={() => scroll("left")}
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-900/90 border-purple-400/30 backdrop-blur-md text-purple-300 hover:bg-purple-900/60 hover:text-white hover:border-purple-400/50 rounded-full z-20 flex transition-all duration-300 hover:scale-110"
            onClick={() => scroll("right")}
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          div[style*="scrollbarWidth"]::-webkit-scrollbar {
            height: 4px;
            display: block;
          }
          div[style*="scrollbarWidth"]::-webkit-scrollbar-track {
            background: #1f2937;
            border-radius: 10px;
          }
          div[style*="scrollbarWidth"]::-webkit-scrollbar-thumb {
            background: #6b21a8;
            border-radius: 10px;
          }
          div[style*="scrollbarWidth"]::-webkit-scrollbar-thumb:hover {
            background: #7c3aed;
          }
        }
      `}</style>
    </section>
  )
}
