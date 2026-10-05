"use client"

import { motion } from "framer-motion"
import FeaturedProjectSection from "@/components/featured-project"
import ProjectsGallery from "@/components/projects-gallery"
import NavBar from "@/components/nav-bar"
import { Project, featuredProjects, projects } from "@/lib/projects-data"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import { ArrowUpRight, BadgeCheck } from "lucide-react"

// Anything with a full section above stays out of the archive grid.
const featuredSlugs = new Set(featuredProjects.map((project) => project.slug))
const archiveProjects = projects.filter((project) => !featuredSlugs.has(project.slug))

const archiveFilters: { label: string; type: Project["type"] | "all" }[] = [
  { label: "All", type: "all" },
  { label: "Hackathons", type: "hackathon" },
  { label: "Passion projects", type: "passion" },
  { label: "Older work", type: "archive" },
]

const featuredOnLinks = [
  {
    label: "Official Omarchy manual",
    href: "https://learn.omacom.io/2/the-omarchy-manual/90/extra-themes#:~:text=Ghost%20Pastel",
  },
  {
    label: "Omarchy Themes Hub",
    href: "https://omarchy.deepakness.com/themes#:~:text=Ghost%20Pastel",
  },
  {
    label: "VS Code Marketplace",
    href: "https://marketplace.visualstudio.com/items?itemName=rokage.ghost-pastel",
  },
]

function SectionShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="mb-16"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-10 bg-moss-400/70" />
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-moss-300">{eyebrow}</p>
      </div>
      <h2 className="mb-7 text-3xl font-medium text-white md:text-4xl">{title}</h2>
      {children}
    </motion.section>
  )
}

export default function ProjectsPage() {
  const [archiveFilter, setArchiveFilter] = useState<Project["type"] | "all">("all")
  const visibleArchive =
    archiveFilter === "all" ? archiveProjects : archiveProjects.filter((project) => project.type === archiveFilter)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
              My <span className="text-moss-400 font-normal">Work</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Language models from scratch, LLM-driven game agents, computer vision, and tools that explain how they work.
            </p>
            <nav className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs text-gray-500">
              {featuredProjects.map((project, index) => (
                <Link key={project.slug} href={`#${project.slug}`} className="transition-colors hover:text-moss-300">
                  {String(index + 1).padStart(2, "0")} {project.title}
                </Link>
              ))}
            </nav>
          </motion.div>

          {featuredProjects.map((project, index) => (
            <FeaturedProjectSection key={project.slug} project={project} index={index} />
          ))}

          <SectionShell eyebrow="Design" title="Side quests">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col rounded-lg border border-gray-800 bg-gray-900/35 p-5">
                <img
                  src="/projects/omarchy-theme1.png"
                  alt="Ghost Pastel Omarchy theme screenshot"
                  className="aspect-video w-full rounded-lg border border-gray-800 object-cover"
                />
                <h3 className="mt-5 text-xl font-medium text-white">Ghost Pastel</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  A dark pastel theme for Omarchy with a companion VS Code theme.
                </p>
                <p className="mb-3 mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                  <BadgeCheck className="h-4 w-4 text-moss-400" /> Featured on
                </p>
                <div className="flex flex-col gap-2">
                  {featuredOnLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/60 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-moss-500/60 hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-800 bg-gray-900/35 p-5">
                <img
                  src="/projects/plantside.jpg"
                  alt="Pastel plant site inspiration board"
                  className="aspect-video w-full rounded-lg border border-gray-800 object-cover"
                />
                <h3 className="mt-5 text-xl font-medium text-white">Fictional plant/farm site</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  A pastel farm and plant-themed site concept, rebuilt as an interactive HTML page: toggle the theme,
                  drag pots, pick seed cards and plant the grid. A personal design exercise, not a real product.
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/plant-site/index.html"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-900"
                  >
                    Open concept <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </SectionShell>

          {/* Projects Gallery */}
          <SectionShell eyebrow="Archive" title="Everything else">
            <div className="mb-6 flex flex-wrap gap-2">
              {archiveFilters.map((filter) => (
                <button
                  key={filter.type}
                  onClick={() => setArchiveFilter(filter.type)}
                  className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                    archiveFilter === filter.type
                      ? "border-moss-500/70 bg-moss-500/10 text-moss-300"
                      : "border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300"
                  }`}
                >
                  {filter.label}
                  <span className="ml-2 text-gray-600">
                    {filter.type === "all"
                      ? archiveProjects.length
                      : archiveProjects.filter((project) => project.type === filter.type).length}
                  </span>
                </button>
              ))}
            </div>
            <ProjectsGallery key={archiveFilter} projects={visibleArchive} />
          </SectionShell>
        </div>
      </main>
    </div>
  )
}
