"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const current = document.documentElement.classList.contains("light") ? "light" : "dark"
    setTheme(current)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(next)
    try {
      localStorage.setItem("theme", next)
    } catch {}
    setTheme(next)
  }

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      className="fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-lg border-2 border-moss-600/40 bg-gray-800/80 text-moss-400 shadow-lg backdrop-blur-md transition-colors hover:border-moss-500 hover:text-moss-300 [image-rendering:pixelated]"
    >
      {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
    </motion.button>
  )
}
