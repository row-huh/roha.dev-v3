"use client"

import { motion, useScroll, useMotionValue, useSpring } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Github, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { usePathname } from "next/navigation"


// Extracted HomePage content into a separate component for cleaner conditional rendering
function HomePageContent() {
  const { scrollYProgress } = useScroll()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const pathname = usePathname()

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])


  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Interactive Background with Marble */}

      {/* Navigation */}
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

      {/* Hero Section */}

      {/* My Skills Section */}

      {/* My Coding Journey Section (Certificates) */}

      {/* University Journey Section */}

      {/* Hackathons Timeline Section */}

      {/* Barricade Tape */}

      {/* Contractor Section */}


      {/* Barricade Tape */}

      {/* Deep Learning Journey Section */}
 

      {/* What I'm Building Section */}


      {/* Collaborations */}


      {/* Blogs Carousel Section */}


      {/* Final CTA */}

    </div>
    )

  
}

export default function HomePage() {
  return <HomePageContent />
}
