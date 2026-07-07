"use client"

import { motion } from "framer-motion"
import ProjectsGallery from "@/components/projects-gallery"
import NavBar from "@/components/nav-bar"
import { Project, projects } from "@/lib/projects-data"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import {
  ArrowUpRight,
  BadgeCheck,
  Github,
  Image as ImageIcon,
  MonitorPlay,
  Sparkles,
} from "lucide-react"

const expandedProjects: Project[] = [
  ...projects,
  {
    slug: "physiotherapy-guidance-system",
    title: "Physiotherapy Guidance System",
    description:
      "A web-based guidance system for physiotherapy workflows and patient support.",
    image: "/projects/projects/physio-guidance.svg",
    tags: ["Healthcare", "Web", "Guidance System"],
    githubLink: "https://github.com/row-huh/physio-therapy-web",
    type: "archive",
  },
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

function MissingAsset({ label }: { label: string }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-900/70 p-6 text-center">
      <div>
        <ImageIcon className="mx-auto mb-3 h-8 w-8 text-moss-400" />
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-1 text-xs text-gray-500">Drop this asset into public to activate the preview.</p>
      </div>
    </div>
  )
}

function AssetImage({
  src,
  alt,
  label,
  className = "min-h-[220px] w-full object-cover",
}: {
  src: string
  alt: string
  label: string
  className?: string
}) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return <MissingAsset label={label} />
  }

  return <img src={src} alt={alt} className={className} onError={() => setMissing(true)} />
}

function AssetVideo({
  src,
  label,
}: {
  src: string
  label: string
}) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return <MissingAsset label={label} />
  }

  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="min-h-[260px] w-full object-cover"
      onError={() => setMissing(true)}
    />
  )
}

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
              Creative Technologist building at the intersection of AI, interfaces, games, and systems.
            </p>
          </motion.div>

          <SectionShell eyebrow="Featured project" title="gif2ascii">
            <div className="grid gap-8 rounded-lg border border-gray-800 bg-gray-900/40 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-7">
              <div className="overflow-hidden rounded-lg border border-gray-800 bg-black">
                <img
                  src="/projects/gif2ascii.gif"
                  alt="gif2ascii animated demo"
                  className="h-full min-h-[260px] w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="mb-5 text-lg text-gray-300">
                  An animated image converter that turns motion into ASCII texture, because apparently pixels were not dramatic enough.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg bg-moss-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-moss-400"
                  >
                    gif2ascii <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-900"
                  >
                    Repo coming soon <Github className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </SectionShell>

          <SectionShell eyebrow="Linux theme" title='Omarchy theme: "Ghost Pastel"'>
            <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-lg text-gray-300">
                  Rice for the terminal, rouge for the pixels: Linux nerd precision with pastel-fantasy taste.
                </p>
                <div className="mt-6">
                  <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-white">
                    <BadgeCheck className="h-4 w-4 text-moss-400" /> Featured on
                  </p>
                  <div className="flex flex-col gap-3">
                    {featuredOnLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/60 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-moss-500/60 hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <AssetImage
                  src="/projects/omarchy-theme1.png"
                  alt="Ghost Pastel Omarchy theme screenshot"
                  label="Ghost Pastel theme image 1"
                />
                <AssetImage
                  src="/projects/omarchy-theme2.png"
                  alt="Ghost Pastel companion theme screenshot"
                  label="Ghost Pastel theme image 2"
                />
                <AssetImage
                  src="/projects/vscode-ghostpastel.png"
                  alt="Ghost Pastel VS Code companion theme screenshot"
                  label="Ghost Pastel VS Code companion image"
                  className="min-h-[220px] w-full object-cover sm:col-span-2"
                />
              </div>
            </div>
          </SectionShell>

          <SectionShell eyebrow="Interactive concept" title="Fictional plant/farm site">
            <div className="rounded-lg border border-gray-800 bg-gray-900/35 p-5 md:p-7">
              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-lg text-gray-300">
                    A pastel-colored farm and plant-themed site concept, now rebuilt as an interactive HTML page inspired by the original mockup.
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-500">
                    Some assets in this repo were my original starting style and direction for the aesthetic, but the site itself is fictional: a personal design exercise, not a real product.
                  </p>
                </div>
                <Link
                  href="/plant-site/index.html"
                  target="_blank"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-900"
                >
                  Open concept <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-800 bg-black">
                <iframe
                  src="/plant-site/index.html"
                  title="Interactive pastel plant site concept"
                  className="h-[720px] w-full"
                />
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-[0.45fr_0.55fr]">
                <AssetImage
                  src="/projects/plantside.jpg"
                  alt="Original pastel plant site inspiration board"
                  label="Plant site inspiration image"
                  className="min-h-[180px] w-full rounded-lg border border-gray-800 object-cover"
                />
                <div className="flex flex-col justify-center">
                <p className="text-lg text-gray-300">
                  The embedded version is interactable: toggle the theme, shuffle and drag pots, pick seed cards, plant the grid, and add market items.
                </p>
                </div>
              </div>
            </div>
          </SectionShell>

          <SectionShell eyebrow="Games + LLMs" title="Court of Whispers">
            <div className="grid gap-7 rounded-lg border border-gray-800 bg-gray-900/35 p-5 md:grid-cols-[1.15fr_0.85fr] md:p-7">
              <div className="overflow-hidden rounded-lg border border-gray-800 bg-black">
                <AssetVideo src="/projects/court-of-whispers.mp4" label="Court of Whispers looping demo clip" />
              </div>
              <div className="flex flex-col justify-center">
                <MonitorPlay className="mb-4 h-9 w-9 text-moss-400" />
                <p className="text-lg text-gray-300">
                  An experiment combining games with LLMs: narrative systems, character behavior, and a little procedural drama under the hood.
                </p>
              </div>
            </div>
          </SectionShell>

          <SectionShell eyebrow="Interactive explainer" title="LLM Explainer">
            <div className="rounded-lg border border-gray-800 bg-gray-900/35 p-5 md:p-7">
              <div className="mb-5 flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-moss-400" />
                <p className="text-lg text-gray-300">
                  I've been experimenting with making websites explanatory, so I picked the hardest topic I knew to explain and started there.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-800 bg-black">
                <iframe
                  src="/llm-viz/index.html"
                  title="Interactive LLM explainer"
                  className="h-[720px] w-full"
                />
              </div>
            </div>
          </SectionShell>

          {/* Projects Gallery */}
          <SectionShell eyebrow="Archive" title="Existing projects">
            <ProjectsGallery projects={expandedProjects} />
          </SectionShell>
        </div>
      </main>
    </div>
  )
}
