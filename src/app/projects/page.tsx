"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import InteractiveBackground from "@/components/interactive-background"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import ProjectsGallery from "@/components/projects-gallery"
import NavBar from "@/components/nav-bar"
import { projects, type Project } from "@/lib/projects-data"

export default function ProjectsPage() {
  const featuredProject = projects.find((p) => p.isCurrentlyWorking)
  const hackathonProjects = projects.filter((p) => p.type === "hackathon")
  const passionProjects = projects.filter((p) => p.type === "passion")
  const archiveProjects = projects.filter((p) => p.type === "archive")

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

          {/* Featured Project Section */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-24 relative"
            >
              <Card
                className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row gap-8 items-center hover:bg-gray-800/40 transition-all duration-300"
              >
                <div className="lg:w-1/2">
                  <Image
                    src={featuredProject.image || "/placeholder.svg"}
                    alt={featuredProject.title}
                    width={800}
                    height={450}
                    className="rounded-2xl object-cover w-full h-auto"
                  />
                </div>
                <div className="lg:w-1/2">
                  {featuredProject.isCurrentlyWorking && (
                    <span className="bg-green-600/20 text-green-300 text-sm px-4 py-2 rounded-full font-semibold whitespace-nowrap mb-4 inline-block">
                      Currently Working
                    </span>
                  )}
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{featuredProject.title}</h2>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">{featuredProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-purple-600/20 text-purple-300 text-sm px-4 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {featuredProject.githubLink && (
                      <Link
                        href={featuredProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent card click when button is clicked
                      >
                        <Button
                          variant="outline"
                          className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-6 py-3"
                        >
                          <Github className="h-4 w-4 mr-2" /> GitHub
                        </Button>
                      </Link>
                    )}
                    {featuredProject.liveDemoLink && featuredProject.liveDemoLink !== "#" && featuredProject.liveDemoLink !== "" && (
                      <Link
                        href={featuredProject.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent card click when button is clicked
                      >
                        <Button
                          variant="outline"
                          className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-6 py-3"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Hackathon Projects Section */}
          {hackathonProjects.length > 0 && (
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 leading-tight">
                  <span className="text-purple-400 font-normal">Projects</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Innovative solutions built under pressure and collaboration.
                </p>
              </motion.div>
              <ProjectsGallery projects={hackathonProjects} />
            </section>
          )}

          {/* Passion Projects Section */}
          {passionProjects.length > 0 && (
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 leading-tight">
                  Passion <span className="text-purple-400 font-normal">Projects</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Personal explorations and creative ventures outside of formal requirements.
                </p>
              </motion.div>
              <ProjectsGallery projects={passionProjects} />
            </section>
          )}

          {/* Project Archive Section */}
          {archiveProjects.length > 0 && (
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 leading-tight">
                  Project <span className="text-purple-400 font-normal">Archive</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  A collection of older projects and experiments.
                </p>
              </motion.div>
              <ProjectsGallery projects={archiveProjects} />
            </section>
          )}
        </div>
      </main>
    </div>
  )
}