"use client"

import type React from "react"
import { motion } from "framer-motion" // Removed useState, AnimatePresence
import { Card } from "@/components/ui/card"
import { Brain, Search, DollarSign } from "lucide-react" // Removed ChevronDown, ChevronUp

interface JourneyStep {
  title: string
  description: string
  icon: React.ElementType
}

export default function DeepLearningJourney() {
  // Removed showChildren state

  const journeySteps: JourneyStep[] = [
    {
      title: "Pivoting into Deep Learning",
      description:
        "My journey is now taking a deeper dive into the world of deep learning, focusing on the intricate details of neural networks and advanced AI concepts.",
      icon: Brain,
    },
    {
      title: "Looking for AI Internships",
      description:
        "I am actively seeking opportunities to apply my skills and learn from industry experts in AI engineering and research roles.",
      icon: Search,
    },
    {
      title: "Fund My Deep Learning Transition",
      description:
        "If you're looking for a fullstack developer with a strong foundation and keen interest in AI, I'm available to help build your next intelligent application.",
      icon: DollarSign,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="py-56 px-8 relative z-10 mt-20">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-medium text-purple-400 mb-6">What I'm up to now...</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A roadmap of my current focus and future aspirations in the AI space.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {/* Parent Node - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20"
        >
          <Card
            className="p-6 rounded-3xl bg-gray-800/30 border-gray-700/50 backdrop-blur-sm" // Removed cursor-pointer, hover effects, onClick
          >
            <div className="flex items-center gap-4">
              <Brain className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-2xl font-semibold text-white">My Current Focus</h3>
                {/* Removed "Click to reveal..." text */}
              </div>
              {/* Removed Chevron icons */}
            </div>
          </Card>
        </motion.div>

        {/* Child Nodes and Connecting Lines - Animated on scroll into view */}
        <motion.div
          initial="hidden"
          whileInView="visible" // Trigger animation when in view
          viewport={{ once: true, amount: 0.5 }} // Animate once when 50% of component is visible
          variants={containerVariants}
          className="relative w-full flex flex-col items-center mt-16"
        >
          {/* Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Line 1 (Parent to Left Child) */}
            <motion.line x1="50" y1="0" x2="25" y2="20" stroke="#4B5563" strokeWidth="0.2" variants={lineVariants} />
            {/* Line 2 (Parent to Middle Child) */}
            <motion.line x1="50" y1="0" x2="50" y2="20" stroke="#4B5563" strokeWidth="0.2" variants={lineVariants} />
            {/* Line 3 (Parent to Right Child) */}
            <motion.line x1="50" y1="0" x2="75" y2="20" stroke="#4B5563" strokeWidth="0.2" variants={lineVariants} />
          </svg>

          {/* Child Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl relative z-10">
            {journeySteps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="relative z-10">
                <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-6 rounded-3xl h-full flex flex-col justify-between transition-all duration-300 hover:bg-gray-800/40 text-center">
                  <div className="flex flex-col items-center mb-4">
                    <step.icon className="h-10 w-10 text-purple-400 mb-3" />
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
