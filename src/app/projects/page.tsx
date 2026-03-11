"use client"

import { motion } from "framer-motion"
import InteractiveBackground from "@/components/interactive-background"
import ProjectsGallery from "@/components/projects-gallery"
import NavBar from "@/components/nav-bar"
import { projects } from "@/lib/projects-data"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <InteractiveBackground />

      {/* Navigation */}
      < NavBar />

      <main className="relative z-10 py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-medium text-white leading-tight my-[19px] mt-[50px]">
              My <span className="text-purple-400 font-normal">Work</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of my projects, from AI engineering to fullstack development.
            </p>
          </motion.div>

          {/* Projects Gallery */}
          <ProjectsGallery projects={projects} />
        </div>
      </main>
    </div>
  )
}
