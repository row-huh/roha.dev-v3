"use client"

import Image from "next/image"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"

const stats = [
  { value: "15+", label: "Projects" },
  { value: "5+", label: "Hackathons" },
  { value: "4th", label: "Year SE" },
]

export default function AboutApp() {
  return (
    <div className="os-pixel p-6 text-[#3b2f1e]">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <div className="h-24 w-24 overflow-hidden rounded-none border-2 border-[#2f2616] bg-[#dcd0b2]">
            <Image
              src="/miscellaneous/roha2.png"
              alt="Roha Pathan"
              width={96}
              height={96}
              className="pixelated h-full w-full object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-none border-2 border-[#2f2616] bg-[#8fa15e]">
            <span className="h-1.5 w-1.5 animate-pulse bg-[#2f2616]" />
          </span>
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-base font-semibold text-[#3b2f1e]">Roha Pathan</h2>
          <p className="text-[13px] text-[#a8552e]">AI Engineer & Fullstack Developer</p>
          <div className="mt-1 flex items-center justify-center gap-1 text-[12px] text-[#6b5b43] sm:justify-start">
            <MapPin className="h-3 w-3" strokeWidth={2} /> Karachi, Pakistan
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-[13px] leading-relaxed text-[#5a4a32]">
        <p>Final year Software Engineering student with a passion for AI and deep learning.</p>
        <p>
          Currently building an LLM from scratch and exploring the fascinating world of transformer
          architectures.
        </p>
        <p>When not coding, you&apos;ll find me diving into research papers or hackathons.</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="os-shadow-sm rounded-none border-2 border-[#2f2616] bg-[#f3eedd] p-3 text-center"
          >
            <div className="text-base font-semibold text-[#5c7a38]">{s.value}</div>
            <div className="text-[11px] text-[#6b5b43]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href="https://github.com/row-huh"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-none border-2 border-[#2f2616] bg-[#f3eedd] px-3 py-2 text-[12px] text-[#3b2f1e] transition-colors hover:bg-[#e6dcc2]"
        >
          <Github className="h-4 w-4" strokeWidth={2} /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/roha-pathan-687960272/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-none border-2 border-[#2f2616] bg-[#f3eedd] px-3 py-2 text-[12px] text-[#3b2f1e] transition-colors hover:bg-[#e6dcc2]"
        >
          <Linkedin className="h-4 w-4" strokeWidth={2} /> LinkedIn
        </a>
        <a
          href="mailto:roha.pathan125@gmail.com"
          className="flex items-center gap-2 rounded-none border-2 border-[#2f2616] bg-[#f3eedd] px-3 py-2 text-[12px] text-[#3b2f1e] transition-colors hover:bg-[#e6dcc2]"
        >
          <Mail className="h-4 w-4" strokeWidth={2} /> Email
        </a>
      </div>
    </div>
  )
}
