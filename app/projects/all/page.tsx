"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import InteractiveBackground from "@/components/interactive-background"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation" // Import useRouter

interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  githubLink?: string
  liveDemoLink?: string
  type: "featured" | "hackathon" | "passion" | "archive"
  isCurrentlyWorking?: boolean
}

export default function AllProjectsPage() {
  const router = useRouter()

  const projects: Project[] = [
    {
      slug: "llm-from-scratch",
      title: "LLM from Scratch: Unveiling the Transformer",
      description:
        "Building a large language model from the ground up, exploring transformer architectures and attention mechanisms. This project was a deep dive into the foundational architecture of LLMs, implemented using PyTorch.",
      image: "/placeholder.svg?height=400&width=800&text=LLM+Project+Featured",
      tags: ["AI", "Deep Learning", "Transformers", "Python", "PyTorch"],
      githubLink: "https://github.com/row-huh/llm-from-scratch",
      liveDemoLink: "#",
      type: "featured",
      isCurrentlyWorking: true,
    },
    {
      slug: "ai-chatbot-platform",
      title: "AI Chatbot Platform",
      description: "A scalable platform for deploying custom AI chatbots with real-time interaction capabilities.",
      image: "/placeholder.svg?height=200&width=300&text=Chatbot+Platform",
      tags: ["AI", "Node.js", "WebSockets", "PostgreSQL"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "decentralized-identity",
      title: "Decentralized Identity Solution",
      description: "Exploring blockchain-based solutions for secure and user-controlled digital identities.",
      image: "/placeholder.svg?height=200&width=300&text=Decentralized+ID",
      tags: ["Blockchain", "Web3", "Solidity", "Cryptography"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "medical-image-analysis",
      title: "Medical Image Analysis Tool",
      description: "Applying deep learning to assist in the analysis of medical images for diagnostic support.",
      image: "/placeholder.svg?height=200&width=300&text=Medical+AI",
      tags: ["AI", "Computer Vision", "Healthcare", "TensorFlow"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "hackathon-project-4",
      title: "Smart Home Automation",
      description: "Developed an IoT-based smart home system with voice control and energy monitoring.",
      image: "/placeholder.svg?height=200&width=300&text=Smart+Home",
      tags: ["IoT", "Python", "Raspberry Pi", "Automation"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "hackathon-project-5",
      title: "Sentiment Analysis API",
      description: "Built a RESTful API for real-time sentiment analysis of text data using NLP.",
      image: "/placeholder.svg?height=200&width=300&text=Sentiment+API",
      tags: ["NLP", "Flask", "Python", "API"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "university-project-1",
      title: "Course Management System",
      description: "A full-stack web application for managing university courses, students, and grades.",
      image: "/placeholder.svg?height=200&width=300&text=Course+Management",
      tags: ["Java", "Spring Boot", "MySQL", "React"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "university-project-2",
      title: "Operating System Simulator",
      description: "Simulated core operating system functionalities like process scheduling and memory management.",
      image: "/placeholder.svg?height=200&width=300&text=OS+Simulator",
      tags: ["C++", "Operating Systems", "Algorithms"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "university-project-3",
      title: "Database Design Project",
      description: "Designed and implemented a relational database for an e-commerce platform with complex queries.",
      image: "/placeholder.svg?height=200&width=300&text=Database+Design",
      tags: ["SQL", "Database", "Normalization", "Oracle"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "portfolio-v3",
      title: "Portfolio v3",
      description:
        "The third iteration of my personal portfolio, focusing on modern UI/UX and performance optimizations using Next.js App Router and Framer Motion.",
      image: "/placeholder.svg?height=200&width=300&text=Portfolio",
      tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      githubLink: "https://github.com/row-huh/roha-portfolio",
      liveDemoLink: "/",
      type: "passion",
    },
    {
      slug: "realtime-data-dashboard",
      title: "Real-time Data Dashboard",
      description: "A high-performance dashboard for visualizing streaming data with interactive charts and alerts.",
      image: "/placeholder.svg?height=200&width=300&text=Dashboard",
      tags: ["Next.js", "WebSockets", "D3.js", "Data Visualization"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "passion",
    },
    {
      slug: "passion-project-3",
      title: "Personal Finance Tracker",
      description: "A web-based application to track personal income and expenses with budgeting features.",
      image: "/placeholder.svg?height=200&width=300&text=Finance+Tracker",
      tags: ["Next.js", "TypeScript", "Supabase", "Data Analysis"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "passion",
    },
    {
      slug: "archive-project-1",
      title: "Legacy Blog Platform",
      description: "An older blogging platform built with a traditional MVC framework.",
      image: "/placeholder.svg?height=200&width=300&text=Legacy+Blog",
      tags: ["PHP", "Laravel", "MySQL"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "archive",
    },
    {
      slug: "archive-project-2",
      title: "Simple Calculator App",
      description: "A basic calculator application developed for a mobile platform.",
      image: "/placeholder.svg?height=200&width=300&text=Calculator+App",
      tags: ["Java", "Android"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "archive",
    },
    {
      slug: "archive-project-3",
      title: "Early Portfolio Site",
      description: "My very first personal portfolio website, showcasing early web development skills.",
      image: "/placeholder.svg?height=200&width=300&text=Old+Portfolio",
      tags: ["HTML", "CSS", "JavaScript"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "archive",
    },
  ]

  // Filter out the featured project if it exists, as it's shown on the main projects page
  const allOtherProjects = projects.filter((p) => !p.isCurrentlyWorking)

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
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-medium text-white mb-4 leading-tight">
              All <span className="text-purple-400 font-normal">Projects</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive list of all my projects, categorized for easy browsing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allOtherProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-6 rounded-3xl h-full flex flex-col justify-between hover:bg-gray-800/40 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/projects/${project.slug}`)}
                >
                  <Image
                    src={project.image || "/placeholder.svg?height=200&width=300&text=Project+Image"}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="rounded-2xl object-cover w-full h-48 mb-4"
                  />
                  <h3 className="text-xl font-medium text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-purple-600/20 text-purple-300 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {project.githubLink && (
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                      <Link
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
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
        </div>
      </main>
    </div>
  )
}
