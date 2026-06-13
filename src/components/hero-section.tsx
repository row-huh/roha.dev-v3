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
            <p className="font-pixel text-sm tracking-widest text-[var(--v-moss)] mb-4 uppercase">
              🌿 welcome to the village
            </p>
            <h1 className="font-pixel text-5xl md:text-6xl font-medium text-[var(--v-ink)] mb-4 leading-tight">
              Hey, I'm <span className="text-[var(--v-clay)]">Roha</span>
            </h1>
            <p className="text-xl text-[var(--v-ink-soft)] mb-8 leading-relaxed font-light">
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
            {/* Framed like a cozy polaroid pinned to a cottage wall */}
            <div className="relative animate-village-bob">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-2xl overflow-hidden bg-[var(--v-paper)] p-3 shadow-[0_18px_40px_-12px_rgba(110,83,60,0.45)] ring-1 ring-[var(--v-border)]/70 rotate-[-2deg]">
                <div className="relative w-full h-full rounded-xl overflow-hidden ring-1 ring-[var(--v-bark)]/20">
                  {/* Pixel-art village portrait. Fallback: "/overlays/overlay-big.jpg" */}
                  <Image
                    src="/overlays/village-hero.png"
                    alt="Pixel-art plant witch"
                    fill
                    priority
                    quality={95}
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 20rem, 18rem"
                    className="object-cover"
                  />
                </div>
              </div>
              <span aria-hidden className="absolute -bottom-4 -left-4 text-4xl rotate-[8deg]">🪴</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
