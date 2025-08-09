"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink, Sparkles } from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"
import Image from "next/image"
import { projectDetails } from "./projectDetails"



export default function ProjectDetailPageClient({
  slug,
}: {
  slug: string
}) {
  const project = (projectDetails as any)[slug]

  if (!project) {
    // Handle 404 or redirect if project not found
    return (
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex items-center justify-center">
        <InteractiveBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-lg text-gray-400 mb-8">The project you are looking for does not exist.</p>
          <Link href="/projects">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <InteractiveBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-semibold text-white">
              roha.dev
            </motion.div>

            <div className="flex gap-1 bg-gray-800/50 rounded-full p-1 border border-gray-700/50 backdrop-blur-sm">
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link
                  href="/"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link href="/projects" className="px-4 py-2 rounded-full text-sm font-medium bg-gray-700/50 text-white">
                  Work
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link
                  href="/writing"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  Writing
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  Contact
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 py-32 px-8">
        <div className="max-w-4xl mx-auto bg-gray-800/30 border-gray-700/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/projects" className="inline-flex items-center text-gray-400 hover:text-purple-400 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
            </Link>

            {/* Image section - now outside the main text block, but still within the max-width container */}
            <div className="max-w-4xl mx-auto mb-12">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={800} // Adjusted width
                height={300} // Adjusted height
                className="rounded-2xl object-cover w-full h-72" // Adjusted height
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{project.title}</h1>
            <div
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />

            <div className="flex flex-wrap gap-4 mt-12">
              {project.githubLink && (
                <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Github className="h-4 w-4 mr-2" /> View Code
                  </Button>
                </Link>
              )}
              {project.liveDemoLink && (
                <Link href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                  </Button>
                </Link>
              )}
            </div>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent px-4 py-2"
              >
                <Sparkles className="h-4 w-4 mr-2" /> Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
