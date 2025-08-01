"use client"

import { motion } from "framer-motion"

export default function GranularBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base Background */}
      <div className="absolute inset-0 bg-gray-900" />

      {/* Granular Texture Overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.03) 2px, transparent 2px)
          `,
          backgroundSize: "60px 60px, 80px 80px, 40px 40px, 100px 100px, 120px 120px",
          backgroundPosition: "0 0, 30px 30px, 10px 10px, 50px 50px, 60px 60px",
        }}
      />

      {/* Fine Grain Texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.15) 0.5px, transparent 0.5px),
            radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.1) 0.5px, transparent 0.5px),
            radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.12) 0.5px, transparent 0.5px),
            radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.08) 0.5px, transparent 0.5px)
          `,
          backgroundSize: "30px 30px, 45px 45px, 35px 35px, 50px 50px",
          backgroundPosition: "0 0, 15px 15px, 25px 5px, 35px 25px",
        }}
      />

      {/* Subtle Color Gradients */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Animated Grain */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0.5px, transparent 0.5px),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.15) 0.5px, transparent 0.5px)
          `,
          backgroundSize: "40px 40px, 60px 60px",
        }}
      />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fillOpacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
