"use client"

import { motion } from "framer-motion"
import TerminalAnimation from "./terminal-animation" // Import TerminalAnimation
import AIAssistantPreview from "./ai-assistant-preview" // Import AIAssistantPreview component




export default function HeroSection() {
  return (
    <section className="pt-24 pb-20 px-8 relative z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-medium text-white mb-4 leading-tight">
              Hey, I'm <span className="text-purple-400 font-normal">Roha</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light">
              Fullstack developer exploring AI engineering and building intelligent applications.
            </p>
            <AIAssistantPreview compact={true} />
          </motion.div>

          {/* Right Side - Terminal Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative w-full h-[400px] flex items-center justify-center p-4" // Removed liquid glass styling
          >
            <TerminalAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
