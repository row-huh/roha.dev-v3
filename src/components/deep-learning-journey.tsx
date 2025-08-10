"use client"

import type React from "react"
import { motion, Variants } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Brain, Search, DollarSign } from "lucide-react"

interface JourneyStep {
  title: string
  description: string
  icon: React.ElementType
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
} as const

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
} as const

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
} as const

export default function DeepLearningJourney() {
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

  return (
    <section className="px-6 relative z-10 mt-16">
      <div className="max-w-5xl mx-auto text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-medium text-purple-400 mb-4">What I'm up to now...</h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            A roadmap of my current focus and future aspirations in the AI space.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {/* Parent Node */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-20"
        >
          <Card className="p-4 rounded-2xl bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">My Current Focus</h3>
            </div>
          </Card>
        </motion.div>

        {/* Children */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
          className="relative w-full flex flex-col items-center mt-12"
        >
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.line x1="50" y1="0" x2="25" y2="20" stroke="#4B5563" strokeWidth="0.2" variants={lineVariants} />
            <motion.line x1="50" y1="0" x2="50" y2="20" stroke="#4B5563" strokeWidth="0.2" variants={lineVariants} />
            <motion.line x1="50" y1="0" x2="75" y2="20" stroke="#4B5563" strokeWidth="0.2" variants={lineVariants} />
          </svg>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl relative z-10">
            {journeySteps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="relative z-10">
                <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-4 rounded-2xl h-full flex flex-col justify-between text-center transition-all duration-300 hover:bg-gray-800/40">
                  <div className="flex flex-col items-center mb-3">
                    <step.icon className="h-6 w-6 text-purple-400 mb-2" />
                    <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
