"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  href: string
  title: string
  icon: ReactNode
  className?: string
}

/**
 * Square, vivid tile with animated gradient border and subtle hover tilt.
 */
export function ToolCard({ href, title, icon, className }: ToolCardProps) {
  return (
    <Link href={href} className="inline-block">
      <motion.div
        whileHover={{ scale: 1.03, rotate: 0.3 }}
        whileTap={{ scale: 0.98 }}
        className={cn("relative size-28 rounded-lg p-[2px]", className)}
      >
        {/* Animated gradient border */}
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,rgba(168,85,247,0.9),rgba(236,72,153,0.9),rgba(6,182,212,0.9),rgba(168,85,247,0.9))] opacity-70 blur-[2px] [animation:spin_6s_linear_infinite]" />
        {/* Inner */}
        <div className="relative z-10 flex size-full flex-col items-center justify-center rounded-lg border border-white/10 bg-gray-950/70 backdrop-blur-sm">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10">
            {icon}
          </div>
          <div className="text-xs font-medium text-white">{title}</div>
        </div>
        {/* Soft outer glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-purple-600/20 blur-xl opacity-50" />
      </motion.div>
    </Link>
  )
}
