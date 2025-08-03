"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  title: string
  description: string
  date: string
  image: string
  link: string
}

interface BlogsCarouselProps {
  posts: BlogPost[]
}

export default function BlogsCarousel({ posts }: BlogsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 2 // Scroll half the width of the carousel
      carouselRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            className="flex-none w-full md:w-1/2 lg:w-1/3 px-4 snap-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-6 rounded-3xl h-full flex flex-col justify-between hover:bg-gray-800/40 transition-all duration-300">
              <Link href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                <Image
                  src={post.image || "/placeholder.svg?height=200&width=300&text=Blog+Image"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="rounded-2xl object-cover w-full h-48 mb-4"
                />
                <h4 className="text-xl font-medium text-white mb-2">{post.title}</h4>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.description}</p>
              </Link>
              <p className="text-xs text-gray-400 mt-auto">{post.date}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -left-4 -translate-y-1/2 bg-gray-800/50 border-gray-700/50 backdrop-blur-md text-gray-300 hover:bg-gray-700 hover:text-white rounded-full z-20 hidden md:flex"
        onClick={() => scroll("left")}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 -translate-y-1/2 bg-gray-800/50 border-gray-700/50 backdrop-blur-md text-gray-300 hover:bg-gray-700 hover:text-white rounded-full z-20 hidden md:flex"
        onClick={() => scroll("right")}
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
