"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AIAssistantPreview() {
  const [isHovered, setIsHovered] = useState(false)

  const sampleMessages = [
    "What's Roha working on with LLMs?",
    "Tell me about transformer architectures",
    "How does attention mechanism work?",
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Card
        className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm rounded-3xl overflow-hidden hover:bg-gray-800/40 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Description */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-1">Pethia AI</h3>
                  <p className="text-gray-400">Your AI companion</p>
                </div>
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed">
                Ask me anything about AI, machine learning, or Roha's projects. I'm here to help you understand complex
                concepts and explore the fascinating world of artificial intelligence.
              </p>

              <Link href="/assistant">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full group">
                  Start Conversation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Right Side - Chat Preview */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: isHovered ? 1.02 : 1,
                  rotateY: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
              >
                {/* Chat Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Pethia AI</p>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                {/* Sample Messages */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-4 py-3 max-w-xs">
                      <p className="text-gray-200 text-sm">
                        Hi! I'm here to help you learn about AI and Roha's work. What would you like to know?
                      </p>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-end"
                      >
                        <div className="bg-purple-600 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-white text-sm">
                            {sampleMessages[Math.floor(Math.random() * sampleMessages.length)]}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-3 mt-4"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                      <div className="bg-gray-800/50 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
