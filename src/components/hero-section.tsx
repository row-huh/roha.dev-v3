"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import AIAssistantPreview from "./ai-assistant-preview" // Import AIAssistantPreview component




export default function HeroSection() {
  return (
    <section className="pt-24 pb-20 px-8 relative z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
          {/* Left: Text and Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 max-w-3xl text-left"
          >
            <h1 className="text-5xl md:text-6xl font-medium text-white mb-4 leading-tight">
              Hey, I'm <span className="text-purple-400 font-normal">Roha</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light">
              Fullstack developer exploring AI engineering and building intelligent applications.
            </p>
            <div className="mt-2">
              <AIAssistantPreview align="left" />
            </div>
          </motion.div>

          {/* Right: Rounded square image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="w-full md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/overlays/overlay-big.jpg"
                alt="Overlay visual"
                fill
                priority
                quality={95}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 20rem, 18rem"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
