"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import InteractiveBackground from "@/components/interactive-background"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import ProjectsCarousel from "@/components/projects-carousel"
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

export default function ProjectsPage() {
  const router = useRouter() // Initialize useRouter

  const projects: Project[] = [
    {
      slug: "llm-from-scratch",
      title: "LLM from Scratch: Unveiling the Transformer",
      description:
        "Building a large language model from the ground up, exploring transformer architectures and attention mechanisms. This project is a deep dive into the foundational architecture of LLMs.",
      image: "/projects/highlight/llm-from-scratch.png",
      tags: ["AI", "Deep Learning", "Transformers", "Python", "PyTorch"],
      githubLink: "https://github.com/row-huh/llm-from-scratch",
      liveDemoLink: "#",
      type: "featured",
      isCurrentlyWorking: true,
    },
    {
      slug: "malama-ai",
      title: "MalamaAI- Skin Disease Detection",
      description: "MalamaAI detects skin diseases using ml model based off of dinov2 deployed on a webapp built with Next.js and Flask, it also uses Llama 3.370b model for accurate analysis. ",
      image: "/placeholder.svg?height=200&width=300&text=Chatbot+Platform",
      tags: ["ML", "Next.js", "Flask", "Llama", "DinoV2"],
      githubLink: "https://github.com/row-huh/MalamaAI",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "time-venturers",
      title: "Time Venturers - Text Based RPG",
      description: "Time Venturers is a text-based role-playing game set in the future. You've been pulled into the year 2094 — but you don’t know who did it or why. Your mission? Figure it out as you explore this strange new world!",
      image: "/projects/projects/time-venturers.png",
      tags: ["Python"],
      githubLink: "https://github.com/row-huh/time-ventures",
      liveDemoLink: "https://www.youtube.com/watch?v=2ck6IDWG4Kc&t=15s&pp=ygUKcm9oYXRoZWRldg%3D%3D",
      type: "passion"
    },
    {
      slug: "neutral",
      title: "Neutral - Detecting subconscious biases",
      description: "Applying deep learning to assist in the analysis of medical images for diagnostic support.",
      image: "/projects/projects/neutral.png",
      tags: ["AI", "ML", "Streamlit", "Flask"],
      githubLink: "https://github.com/TechEvents-BUDS/Tecna-s-Tribe_Techathon/",
      liveDemoLink: "#",
      type: "archive",
    },
    {
      slug: "pethia",
      title: "Pethia",
      description: "Sassiest discord bot known to man",
      image: "/projects/projects/pethia.png",
      tags: ["Python", "Discord.py", "External APIs"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "passion",
    },
    {
      slug: "bool",
      title: "Bool",
      description: "One of the first things I ever coded. Bool is just a simple rule based bot bud",
      image: "/projects/projects/bool.png",
      tags: ["Python"],
      githubLink: "#",
      liveDemoLink: "#",
      type: "passion",
    },

    {
      slug: "relic",
      title: "Relic",
      description: "Search through an entire historical archive of data to correlate events from the past to history",
      image: "/projects/projects/relic.png",
      tags: ["PHP", "MySQL", "Node.js"],
      githubLink: "",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "goldfish-expense-tracker",
      title: "Gold Fish",
      description: "Tool to track, manage, and store expenses",
      image: "/projects/projects/goldfish.png",
      tags: ["Streamlit", "Python"],
      githubLink: "https://github.com/row-huh/Expense-Tracker",
      liveDemoLink: "#",
      type: "hackathon",
    },
    {
      slug: "portfolio-v3",
      title: "Portfolio v3",
      description:
        "The third iteration of my personal portfolio, focusing on modern UI/UX and storytelling",
      image: "/projects/projects/portfoliov3.png",
      tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      githubLink: "https://github.com/row-huh/roha-portfolio",
      liveDemoLink: "/",
      type: "hackathon",
    },
    {
      slug: "accessible-ui",
      title: "Accessible UI",
      description: "A high-performance dashboard for visualizing streaming data with interactive charts and alerts.",
      image: "/projects/projects/accessible-ui.png",
      tags: ["LangChain", "Langflow", "Python"],
      githubLink: "https://github.com/row-huh/AccessibleUI",
      liveDemoLink: "https://youtu.be/rG930Hee7OE",
      type: "archive",
    },

    {
      slug: "after-school",
      title: "After School",
      description: "A practical guide to essential life skills rarely taught in school — from social dynamics and time management to sustainable living and mental health.",
      image: "/projects/projects/afterschool.png",
      tags: ["Vertex AI", "React"],
      githubLink: "https://github.com/Laiba-lax/AfterSchool",
      liveDemoLink: "https://devpost.com/software/skinai-ufobl8",
      type: "hackathon",
    },
    {
      slug: "tic-tac-toe-ai",
      title: "Tic Tac Toe AI",
      description: "An unbeatable Tic-Tac-Toe AI that uses Minimax with Alpha-Beta pruning. It thinks ahead, plays smart, and never loses — ever.",
      image: "/projects/projects/tictactoeai.png",
      tags: ["Python", "Search", "Minimax"],
      githubLink: "https://github.com/row-huh/ticTacToeAI",
      liveDemoLink: "#",
      type: "hackathon",
    },

    {
      slug: "portfolio-v2",
      title: "Portfolio v2",
      description: "Second iteration - I ditched it because it look wayy too generic",
      image: "/projects/projects/portfoliov2.png",
      tags: ["React", "Nextjs", "TypeScript"],
      githubLink: "",
      liveDemoLink: "https://roha-dev-v2.vercel.app/",
      type: "hackathon",
    }
  ]

  const featuredProject = projects.find((p) => p.isCurrentlyWorking)
  const hackathonProjects = projects.filter((p) => p.type === "hackathon")
  const passionProjects = projects.filter((p) => p.type === "passion")
  const archiveProjects = projects.filter((p) => p.type === "archive")

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
                className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row gap-8 items-center cursor-pointer hover:bg-gray-800/40 transition-all duration-300"
                onClick={() => router.push(`${featuredProject.slug}`)} // Add onClick to Card
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
                    {featuredProject.liveDemoLink && (
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
              <ProjectsCarousel projects={hackathonProjects} />
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
              <ProjectsCarousel projects={passionProjects} />
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
              <ProjectsCarousel projects={archiveProjects} />
            </section>
          )}
        </div>
      </main>
    </div>
  )
}