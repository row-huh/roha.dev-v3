"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"



export default function NavBar() {

    const pathname = usePathname();

    return (
     <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-semibold text-white">
              roha.dev
            </motion.div>

            <div className="flex items-center gap-4">
              <div className="flex gap-1 bg-gray-800/50 rounded-full p-1 border border-gray-700/50 backdrop-blur-sm">
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href="/about"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/about" ? "bg-gray-700/50 text-white" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"}`}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href="/projects"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/projects" ? "bg-gray-700/50 text-white" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"}`}
                  >
                    Work
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href="/writing"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/writing" ? "bg-gray-700/50 text-white" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"}`}
                  >
                    Writing
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href="/contact"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/contact" ? "bg-gray-700/50 text-white" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"}`}
                  >
                    Contact
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </nav>
        )
}