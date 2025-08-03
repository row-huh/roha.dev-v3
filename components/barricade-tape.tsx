"use client"

import { motion } from "framer-motion"

interface BarricadeTapeProps {
  text: string
  direction?: "left" | "right"
}

export default function BarricadeTape({ text, direction = "left" }: BarricadeTapeProps) {
  const animationVariants = {
    animate: {
      x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  }

  return (
    <div className="relative w-full overflow-hidden py-2 bg-gray-800/30 border-y border-gray-700/50 backdrop-blur-sm my-8">
      <motion.div
        className="flex text-purple-400 font-bold text-4xl md:text-6xl uppercase whitespace-nowrap"
        variants={animationVariants}
        animate="animate"
      >
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="mx-4">
              {text}
            </span>
          ))}
      </motion.div>
    </div>
  )
}
