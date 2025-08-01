"use client"

import { motion, type MotionValue } from "framer-motion"

interface InteractiveBackgroundProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export default function InteractiveBackground({ mouseX, mouseY }: InteractiveBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900" />

      {/* Interactive Marble that follows cursor */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(219, 39, 119, 0.2) 50%, transparent 70%)",
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      {/* Secondary marble with delay */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)",
          x: mouseX,
          y: mouseY,
          translateX: "-200%",
          translateY: "-150%",
        }}
        transition={{ type: "spring", stiffness: 30, damping: 40 }}
      />

      {/* Tertiary marble */}
      <motion.div
        className="absolute w-48 h-48 rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
          x: mouseX,
          y: mouseY,
          translateX: "100%",
          translateY: "-100%",
        }}
        transition={{ type: "spring", stiffness: 20, damping: 50 }}
      />

      {/* Static ambient blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 0.9, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </div>
  )
}
