"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export default function InteractiveBackground() {
  const { scrollY } = useScroll()

  // Define initial positions and speed factors for each blob
  const blobs = [
    {
      id: 1,
      initialY: "20%",
      initialX: "20%",
      speedFactor: -0.2, // Moves slower up
      opacity: 0.3,
      bg: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(219, 39, 119, 0.2) 50%, transparent 70%)",
    },
    {
      id: 2,
      initialY: "15%",
      initialX: "75%",
      speedFactor: -0.4, // Moves faster up
      opacity: 0.2,
      bg: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)",
    },
    {
      id: 3,
      initialY: "50%",
      initialX: "5%",
      speedFactor: -0.3, // Moves moderately up
      opacity: 0.15,
      bg: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
    },
    {
      id: 4,
      initialY: "80%",
      initialX: "40%",
      speedFactor: -0.1, // Moves slowest up
      opacity: 0.25,
      bg: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(219, 39, 119, 0.2) 50%, transparent 70%)",
    },
    {
      id: 5,
      initialY: "30%",
      initialX: "90%",
      speedFactor: -0.5, // Moves fastest up
      opacity: 0.18,
      bg: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)",
    },
    {
      id: 6,
      initialY: "100%", // Starts below viewport
      initialX: "10%",
      speedFactor: -0.6, // Moves very fast up
      opacity: 0.22,
      bg: "radial-gradient(circle, rgba(255, 100, 200, 0.3) 0%, rgba(100, 200, 255, 0.2) 50%, transparent 70%)",
    },
    {
      id: 7,
      initialY: "110%", // Starts further below viewport
      initialX: "60%",
      speedFactor: -0.7, // Moves even faster up
      opacity: 0.28,
      bg: "radial-gradient(circle, rgba(180, 80, 255, 0.3) 0%, rgba(255, 150, 50, 0.2) 50%, transparent 70%)",
    },
  ]

  const yTransforms = blobs.map((blob) => useTransform(scrollY, (latest) => latest * blob.speedFactor))

  return (
    <div className="fixed inset-0 z-0">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gray-950" />

      {/* Subtle Noise/Grain Effect */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
        }}
      />

      {/* Dynamic ambient blobs with scroll-driven Y movement */}
      {blobs.map((blob, index) => {
        const yTransform = yTransforms[index] // Scroll-driven Y movement
        return (
          <motion.div
            key={blob.id}
            className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [blob.opacity, blob.opacity + 0.1, blob.opacity],
              y: yTransform,
            }}
            transition={{
              duration: Math.random() * 10 + 10, // Random duration for subtle animation
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              background: blob.bg,
              top: blob.initialY,
              left: blob.initialX,
              translateX: "-50%", // Center the blob based on its top/left
              translateY: "-50%",
            }}
          />
        )
      })}

      {/* Fine Grid */}
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
