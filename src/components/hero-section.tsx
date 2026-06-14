"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import AIAssistantPreview from "./ai-assistant-preview" 




export default function HeroSection() {
  return (
    <section className="pt-24 pb-20 px-8 relative z-10 min-h-screen flex items-center">
      {/* Soft green accent backdrop that gradually fades away down the page */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-moss-500/10 via-moss-500/[0.04] to-transparent" />
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
          {/* Left: Text and Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 max-w-3xl text-left"
          >
            <p className="mb-4 flex items-center gap-2 text-xs sm:text-sm font-display uppercase tracking-[0.2em] text-moss-500">
              <span aria-hidden>🌿</span> Welcome to the village
            </p>
            <h1 className="text-5xl md:text-7xl font-display text-white mb-4 leading-tight">
              Hey, I'm <span className="text-moss-500">Roha</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 leading-relaxed font-light">
               I'm a software engineer who writes sometimes, watches too much anime, is into physics, science fiction, and books. I like solving problems, going for long walks, sleeping, talking about tech and distro hopping &gt;_&lt;
            </p>

          </motion.div>

          {/* Right: Rounded square image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="w-full md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]">
              {/* Pixel-art character — no card background, sits directly on the page */}
              <Image
                src="/overlays/green/green_character.png"
                alt="Roha pixel character"
                width={768}
                height={1024}
                priority
                quality={100}
                className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[140%] w-auto max-w-none object-contain pointer-events-none select-none [image-rendering:pixelated]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
