"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// Order must match vertical order in app/page.tsx
const sections = [
  { id: "hero", label: "Home" },
  { id: "playing", label: "Music" },
  { id: "blogs", label: "Writing" },
  { id: "skills", label: "Skills" },
  { id: "building", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "cta", label: "Contact" },
]

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const getOffset = () => {
      const nav = document.querySelector("nav") as HTMLElement | null
      // Add a small breathing room below the navbar
      return (nav?.offsetHeight ?? 0) + 8
    }

    const handleScroll = () => {
      const offset = getOffset()
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        if (top <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    const nav = document.querySelector("nav") as HTMLElement | null
    const offset = (nav?.offsetHeight ?? 0) + 8
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <nav className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center justify-end gap-3"
            aria-label={`Go to ${section.label}`}
          >
            {/* Label */}
            <span
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? "opacity-100 text-purple-400"
                  : "opacity-0 group-hover:opacity-100 text-gray-400"
              }`}
            >
              {section.label}
            </span>

            {/* Dot indicator */}
            <div className="relative">
              <motion.div
                className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                  activeSection === section.id
                    ? "border-purple-400 bg-purple-400 scale-125"
                    : "border-gray-500 bg-transparent group-hover:border-purple-400"
                }`}
                whileHover={{ scale: 1.3 }}
              />
              {activeSection === section.id && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-purple-400/30"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
          </button>
        ))}
      </nav>
    </div>
  )
}
