"use client"

import { motion } from "framer-motion"

export default function WhatsPlaying() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
      className="fixed bottom-4 left-4 z-50 w-[300px] max-w-[calc(100vw-2rem)] rounded-xl border border-moss-500/25 bg-black/50 p-1 shadow-xl shadow-moss-600/20 ring-1 ring-white/5 backdrop-blur-md"
    >
      <iframe
        style={{ borderRadius: "10px" }}
        src="https://open.spotify.com/embed/track/0H7Wdgn1C7vFy4z0o2kBUZ?utm_source=generator&theme=0"
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Embed"
      ></iframe>
    </motion.div>
  )
}
