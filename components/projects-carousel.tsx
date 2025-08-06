"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  githubLink?: string
  liveDemoLink?: string
  type: "featured" | "hackathon" | "university" | "passion" | "archive" // Added type for categorization
}

interface ProjectsCarouselProps {
  projects: Project[]
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
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
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="flex-none w-full md:w-1/2 lg:w-1/3 px-4 snap-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-6 rounded-3xl h-full flex flex-col justify-between hover:bg-gray-800/40 transition-all duration-300">
              <Link href={`/projects/${project.slug}`} className="block">
                <Image
                  src={project.image || "/placeholder.svg?height=200&width=300&text=Project+Image"}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="rounded-2xl object-cover w-full h-48 mb-4"
                />
                <h4 className="text-xl font-medium text-white mb-2">{project.title}</h4>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
              </Link>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-purple-600/20 text-purple-300 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                {project.githubLink && (
                  <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Github className="h-3 w-3 mr-1" /> Code
                    </Button>
                  </Link>
                )}
                {project.liveDemoLink && (
                  <Link href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" /> Demo
                    </Button>
                  </Link>
                )}
              </div>
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
