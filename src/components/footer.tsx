"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-gray-950 py-8 md:py-12 lg:py-16 relative overflow-hidden">
      <div className="w-full px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-8xl lg:text-[12rem] xl:text-[15rem] font-extrabold text-gray-700/20 leading-none tracking-normal whitespace-nowrap overflow-hidden font-oswald" // Apply font-oswald
          style={{
            textShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          ROW-HUH-ISH
        </motion.h1>
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Roha. All rights reserved.
      </div>
    </footer>
  )
}
