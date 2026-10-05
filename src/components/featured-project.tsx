"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, BookOpen, Github, Image as ImageIcon } from "lucide-react"
import { highlight } from "@/lib/highlight"
import type { FeaturedMedia, FeaturedProject } from "@/lib/projects-data"

const linkIcons = {
  github: Github,
  live: ArrowUpRight,
  writeup: BookOpen,
}

function MissingAsset({ label }: { label: string }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center p-6 text-center">
      <div>
        <ImageIcon className="mx-auto mb-3 h-8 w-8 text-moss-400" />
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-1 text-xs text-gray-500">Drop this asset into public to activate the preview.</p>
      </div>
    </div>
  )
}

function CodePanel({ media }: { media: Extract<FeaturedMedia, { kind: "code" }> }) {
  const html = highlight(media.code, media.language)

  return (
    <div className="code-panel flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-moss-400/80" />
        <span className="font-mono text-xs text-gray-500">{media.filename}</span>
      </div>
      <pre className="overflow-x-auto p-4 [scrollbar-color:#374151_transparent] [scrollbar-width:thin] font-mono text-xs leading-relaxed text-gray-300">
        {html ? <code dangerouslySetInnerHTML={{ __html: html }} /> : <code>{media.code}</code>}
      </pre>
    </div>
  )
}

function Media({ media }: { media: FeaturedMedia }) {
  const [missing, setMissing] = useState(false)

  if (media.kind === "code") return <CodePanel media={media} />

  if (media.kind === "iframe") {
    return <iframe src={media.src} title={media.title} className="h-[640px] w-full" />
  }

  if (media.kind === "video") {
    if (missing) return <MissingAsset label={media.label} />
    return (
      <video
        src={media.src}
        autoPlay
        loop
        muted
        playsInline
        className="h-full min-h-[260px] w-full object-cover"
        onError={() => setMissing(true)}
      />
    )
  }

  if (missing) return <MissingAsset label={media.alt} />
  return (
    <img
      src={media.src}
      alt={media.alt}
      className="h-full min-h-[260px] w-full object-cover"
      onError={() => setMissing(true)}
    />
  )
}

export default function FeaturedProjectSection({ project, index }: { project: FeaturedProject; index: number }) {
  // Embedded pages need the full width; everything else sits beside the write-up.
  const stacked = project.media.kind === "iframe"

  return (
    <motion.section
      id={project.slug}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="mb-16 scroll-mt-28"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-xs text-gray-500">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-10 bg-moss-400/70" />
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-moss-300">{project.eyebrow}</p>
      </div>

      <div
        className={`grid gap-7 rounded-lg border border-gray-800 bg-gray-900/40 p-5 md:p-7 ${
          stacked ? "" : "lg:grid-cols-2"
        }`}
      >
        <div className="flex min-w-0 flex-col">
          <h2 className="text-3xl font-medium text-white md:text-4xl">{project.title}</h2>
          {project.status && (
            <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-moss-300">
              <span className="h-1.5 w-1.5 rounded-full bg-moss-400" />
              {project.status}
            </p>
          )}
          <p className="mt-4 text-lg text-gray-300">{project.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-md border border-gray-800 bg-black/40 px-2 py-1 font-mono text-xs text-gray-400"
              >
                {item}
              </span>
            ))}
          </div>

          {project.specs && (
            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-gray-800 bg-gray-800 sm:grid-cols-3">
              {project.specs.map((spec) => (
                <div key={spec.label} className="bg-black/60 px-3 py-2">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-gray-500">{spec.label}</dt>
                  <dd className="mt-0.5 whitespace-pre font-mono text-sm text-white">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-gray-500">How it works</p>
            <ol className="space-y-2">
              {project.howItWorks.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-gray-400">
                  <span className="mt-px font-mono text-xs leading-6 text-moss-400">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link, i) => {
              const Icon = linkIcons[link.kind]
              const external = link.href.startsWith("http")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(external || link.kind === "live" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={
                    i === 0
                      ? "inline-flex items-center gap-2 rounded-lg bg-moss-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-moss-400"
                      : "inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-900"
                  }
                >
                  {link.label} <Icon className="h-4 w-4" />
                </Link>
              )
            })}
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-lg border border-gray-800 bg-black">
          <Media media={project.media} />
        </div>
      </div>
    </motion.section>
  )
}
