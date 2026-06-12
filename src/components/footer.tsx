"use client"
import { motion } from "framer-motion"

export default function Footer() {
  const isHome = true // cottagecore theme is now site-wide
  return (
  <footer className={`pt-80 pb-16 md:pb-20 lg:pb-24 relative overflow-hidden ${isHome ? "bg-[var(--v-bg-deep)]" : "bg-black"}`}>
      {/* Big background text positioned at bottom */}
      <div className="w-full text-center overflow-hidden px-4 absolute bottom-16 left-0 right-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-extrabold leading-none tracking-tight whitespace-nowrap select-none"
          style={{
            fontSize: "clamp(2rem, 15vw, 12rem)", // More responsive scaling
            fontFamily: isHome
              ? "var(--font-pixel), 'Pixelify Sans', monospace"
              : "'Bebas Neue', 'Anton', 'Oswald', 'Fjalla One', sans-serif", // Taller, condensed fonts
            letterSpacing: "-0.02em",
            color: isHome ? "var(--v-ghost)" : "rgba(255,255,255,0.15)",
            textShadow: isHome ? "0px 4px 12px rgba(0,0,0,0.25)" : "0px 4px 10px rgba(0,0,0,0.2)",
            fontStretch: "condensed", // Makes font appear taller
            transform: "scaleY(1.8)", // Much more vertical stretch
            transformOrigin: "center bottom", // Stretch from bottom
          }}
        >
          ROW-HUH-ISH
        </motion.h1>
      </div>
      
      {/* Footer text */}
      <div className={`absolute bottom-4 left-0 right-0 text-center text-sm px-4 ${isHome ? "text-[var(--v-bark)]" : "text-gray-500"}`}>
        &copy; {new Date().getFullYear()} Roha. All rights reserved. {isHome && "🌿"}
      </div>
      {/* Prevent overscroll glow / iOS bounce dark reveal */}
      <div className={`absolute -bottom-10 left-0 right-0 h-10 pointer-events-none ${isHome ? "bg-[var(--v-bg-deep)]" : "bg-black"}`} aria-hidden="true" />
    </footer>
  )
}