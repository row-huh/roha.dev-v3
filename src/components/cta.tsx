import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "./ui/button"

export default function CTA() {
  return (
    <section className="py-24 sm:py-32 md:py-40 lg:py-56 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 sm:mb-6">
            Let's Build Something
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Every great collaboration starts with a conversation. Let's create something that pushes boundaries.
          </p>
          
          {/* Desktop Button Layout */}
          <div className="hidden sm:flex gap-4 md:gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium rounded-full transition-all duration-200 hover:scale-105"
              >
                Start a Conversation
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium rounded-full bg-transparent transition-all duration-200 hover:scale-105"
              >
                View My Work
              </Button>
            </Link>
          </div>

          {/* Mobile Button Layout - Stacked */}
          <div className="sm:hidden space-y-4">
            <Link href="/contact" className="block">
              <Button
                size="lg"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full transition-all duration-200"
              >
                Start a Conversation
              </Button>
            </Link>
            <Link href="/projects" className="block">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-4 text-lg font-medium rounded-full bg-transparent transition-all duration-200"
              >
                View My Work
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}