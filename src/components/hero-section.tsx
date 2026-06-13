"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import AIAssistantPreview from "./ai-assistant-preview" 




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
              Goofing around with Tech &gt;_&lt;
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
              {/* Soft card background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#f6f2e7] to-[#ece4d2] shadow-2xl ring-1 ring-black/5" />
              {/* Pixel-art character popping out of the card */}
              <Image
                src="/overlays/character.png"
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
