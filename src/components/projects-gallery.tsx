"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Github, ExternalLink, Youtube } from "lucide-react"
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
  youtubeLink?: string
  type: "featured" | "hackathon" | "university" | "passion" | "archive"
}

interface ProjectsGalleryProps {
  projects: Project[]
}

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <Card className="group bg-gray-900/50 border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg?height=200&width=300&text=Project+Image"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 4).map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="text-xs text-gray-500 bg-gray-800/80 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-xs text-gray-500 bg-gray-800/80 px-2 py-1 rounded-md">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
                {project.githubLink && project.githubLink !== "#" && project.githubLink !== "" && (
                  <Link 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </Link>
                )}
                {project.liveDemoLink && project.liveDemoLink !== "#" && project.liveDemoLink !== "" && (
                  <Link 
                    href={project.liveDemoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                    aria-label="Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
                {project.youtubeLink && (
                  <Link 
                    href={project.youtubeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/80 text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-all"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
