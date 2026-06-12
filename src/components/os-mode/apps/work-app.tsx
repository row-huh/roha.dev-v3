"use client"

import { useState } from "react"
import { Github, ExternalLink, Youtube, FileCode2 } from "lucide-react"
import { projects, type Project } from "@/lib/projects-data"

const typeColor: Record<Project["type"], string> = {
  featured: "text-[#a8552e] bg-[#f0d9c4]",
  hackathon: "text-[#5c7a38] bg-[#e2ead0]",
  passion: "text-[#9a5a7a] bg-[#efd9e4]",
  archive: "text-[#6b5b43] bg-[#e6dcc2]",
}

export default function WorkApp() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <div className="os-pixel flex h-full flex-col text-[#3b2f1e]">
      {/* Folder toolbar */}
      <div className="flex items-center justify-between border-b-2 border-[#2f2616] bg-[#e0d4b6] px-4 py-2 text-[12px] text-[#6b5b43]">
        <span>{projects.length} items</span>
        <span className="hidden sm:inline">~/work</span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Icon grid */}
        <div className="grid flex-1 auto-rows-min grid-cols-3 gap-1 overflow-y-auto p-3 sm:grid-cols-4">
          {projects.map((p) => (
            <button
              key={p.slug}
              onClick={() => setSelected(p)}
              className={`flex flex-col items-center gap-1.5 rounded-none border-2 p-2 text-center transition-colors ${
                selected?.slug === p.slug
                  ? "border-[#2f2616] bg-[#e2ead0]"
                  : "border-transparent hover:bg-[#f3eedd]"
              }`}
            >
              <FileCode2 className="h-9 w-9 text-[#5c7a38]" strokeWidth={1.6} />
              <span className="line-clamp-2 text-[11px] leading-tight text-[#5a4a32]">{p.title}</span>
            </button>
          ))}
        </div>

        {/* Detail pane */}
        {selected && (
          <div className="hidden w-56 shrink-0 overflow-y-auto border-l-2 border-[#2f2616] bg-[#f3eedd] p-4 sm:block">
            <span
              className={`inline-block rounded-none border-2 border-[#2f2616] px-2 py-0.5 text-[10px] uppercase ${typeColor[selected.type]}`}
            >
              {selected.type}
            </span>
            <h3 className="mt-2 text-[13px] font-semibold text-[#3b2f1e]">{selected.title}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-[#6b5b43]">{selected.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {selected.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-none border border-[#2f2616]/40 bg-[#e6dcc2] px-1.5 py-0.5 text-[10px] text-[#5a4a32]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {selected.githubLink && selected.githubLink !== "#" && (
                <a
                  href={selected.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-none border-2 border-[#2f2616] bg-[#ece6d6] px-3 py-2 text-[12px] text-[#3b2f1e] hover:bg-[#e6dcc2]"
                >
                  <Github className="h-3.5 w-3.5" strokeWidth={2} /> Source
                </a>
              )}
              {selected.liveDemoLink && selected.liveDemoLink !== "#" && (
                <a
                  href={selected.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-none border-2 border-[#2f2616] bg-[#ece6d6] px-3 py-2 text-[12px] text-[#3b2f1e] hover:bg-[#e6dcc2]"
                >
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} /> Live demo
                </a>
              )}
              {selected.youtubeLink && (
                <a
                  href={selected.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-none border-2 border-[#2f2616] bg-[#ece6d6] px-3 py-2 text-[12px] text-[#3b2f1e] hover:bg-[#e6dcc2]"
                >
                  <Youtube className="h-3.5 w-3.5" strokeWidth={2} /> Watch
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
