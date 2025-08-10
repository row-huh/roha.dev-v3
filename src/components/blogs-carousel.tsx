"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useEffect } from "react"

interface BlogPost {
  title: string
  description: string
  date: string
  image: string
  link: string
  logos?: string[] // array of logo image URLs
}

interface BlogsCarouselProps {
  posts: BlogPost[]
}

export default function BlogsCarousel({ posts }: BlogsCarouselProps) {
  type LatestPost = {
    title: string
    description: string
    date: string
    image: string
    link: string
  }

  const [blogPosts, setBlogPosts] = useState<LatestPost[]>([])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch("/api/posts?limit=4", { cache: "no-store" })
        if (!res.ok) return
        const data: LatestPost[] = await res.json()
        if (!cancelled) setBlogPosts(data)
      } catch (e) {
        // silently ignore for now
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

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

  return (
    <section className="py-16 sm:py-24 md:py-32 lg:py-56 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto w-4/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 sm:mb-6">
            Latest Insights
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Dive into my thoughts on AI, development, and the future of technology.
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 gap-4 sm:gap-6"
            style={{ 
              scrollbarWidth: 'thin', 
              scrollbarColor: '#6b21a8 #1f2937'
            }}
          >
            {(posts || blogPosts || []).map((post, index) => (
              <motion.div
                key={index}
                className="flex-none w-80 sm:w-80 md:w-96 snap-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden rounded-2xl sm:rounded-3xl h-full flex flex-col border-0 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/40">
                  {/* Deep dark purple gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-950/80 via-indigo-950/90 to-gray-950/95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-purple-950/40" />
                  
                  {/* Even darker purple hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 via-indigo-900/0 to-black/0 group-hover:from-purple-900/60 group-hover:via-indigo-900/50 group-hover:to-black/40 transition-all duration-500" />
                  
                  {/* Glass effect border with purple tint */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-500" />
                  
                  <Link 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="relative z-10 p-6 sm:p-8 flex flex-col h-full group-hover:transform-none"
                  >
                    {/* Header with external link icon */}
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl sm:text-2xl font-semibold text-white leading-tight group-hover:text-purple-100 transition-colors duration-300 flex-1 pr-4">
                        {post.title}
                      </h4>
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110 flex-shrink-0" />
                    </div>

                    {/* Elegant divider with purple gradient */}
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-4 group-hover:via-purple-400/70 transition-all duration-500" />

                    {/* Description */}
                    <p className="text-gray-300 group-hover:text-gray-200 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4 flex-1 transition-colors duration-300">
                      {post.description}
                    </p>

                    {/* Bottom Section */}
                    <div className="mt-auto pt-4 border-t border-white/10 group-hover:border-purple-400/20 flex justify-between items-center transition-all duration-300">
                      <p className="text-xs sm:text-sm text-gray-400 group-hover:text-purple-300 font-medium transition-colors duration-300">
                        {post.date}
                      </p>
                      
                      {/* Logos */}
                      {post.logos && post.logos.length > 0 && (
                        <div className="flex gap-2">
                          {post.logos.map((logo, i) => (
                            <div 
                              key={i} 
                              className="relative overflow-hidden rounded-lg group-hover:scale-110 transition-transform duration-300"
                            >
                              <Image
                                src={logo}
                                alt="logo"
                                width={24}
                                height={24}
                                className="rounded-lg border border-white/20 group-hover:border-purple-400/30 transition-all duration-300"
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

          {/* Navigation Buttons - now visible on mobile */}
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
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar for mobile */
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