"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function InteractiveDirectory() {
  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Writing", href: "/writing" },
    { name: "Projects", href: "/projects" },
    { name: "Assistant", href: "/assistant" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="relative">
      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl w-full"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-700">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="ml-4 text-gray-400 text-sm font-mono">
            roha@dev:~/site
          </span>
        </div>

        {/* Fixed-size directory content */}
        <div className="font-mono text-sm h-80 flex flex-col gap-3 overflow-hidden">
          {pages.map((page, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 8, color: "#60a5fa" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={page.href} className="text-green-400 hover:text-blue-400">
                {`$ cd ${page.name.toLowerCase()}`}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Code Elements */}
      <motion.div
        className="absolute -top-4 -right-4 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-purple-300 font-mono text-xs">site_navigation</span>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 rounded-lg p-3"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-pink-300 font-mono text-xs">interactive_links</span>
      </motion.div>

      <motion.div
        className="absolute top-1/2 -right-8 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3"
        animate={{ x: [0, 10, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-blue-300 font-mono text-xs">fixed_height</span>
      </motion.div>
    </div>
  )
}
