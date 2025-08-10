"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function TerminalAnimation() {
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [displayedText, setDisplayedText] = useState<string[]>([])

  const codeLines = [
    "$ git clone https://github.com/roha/llm-from-scratch",
    "$ cd llm-from-scratch",
    "$ python train.py --model transformer --layers 12",
    "Loading dataset... ✓",
    "Initializing model with 117M parameters...",
    "Training epoch 1/100...",
    "Loss: 4.2847 → 3.9234 → 3.6891",
    "Attention patterns emerging...",
    "$ python generate.py --prompt 'The future of AI'",
    "Generating: The future of AI is bright and full of...",
  ]

  useEffect(() => {
    if (currentLine < codeLines.length) {
      const line = codeLines[currentLine]
      if (currentChar < line.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => {
            const newText = [...prev]
            if (!newText[currentLine]) newText[currentLine] = ""
            newText[currentLine] = line.slice(0, currentChar + 1)
            return newText
          })
          setCurrentChar(currentChar + 1)
        }, 50)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setCurrentLine(currentLine + 1)
          setCurrentChar(0)
        }, 1000)
        return () => clearTimeout(timer)
      }
    } else {
      const timer = setTimeout(() => {
        setCurrentLine(0)
        setCurrentChar(0)
        setDisplayedText([])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentLine, currentChar, codeLines])

  return (
    <div className="relative w-full flex justify-center px-4">
      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 shadow-2xl
                   w-full max-w-3xl h-[300px] sm:h-96 overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-700">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="ml-2 sm:ml-4 text-gray-400 text-xs sm:text-sm font-mono">roha@dev:~/projects</span>
        </div>

        {/* Terminal Content */}
        <div className="font-mono text-[10px] sm:text-xs md:text-sm space-y-1 sm:space-y-2 h-full overflow-hidden">
          <AnimatePresence>
            {displayedText.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={
                  line.startsWith("$")
                    ? "text-green-400"
                    : line.includes("✓")
                    ? "text-green-300"
                    : line.includes("Loss:")
                    ? "text-blue-300"
                    : line.includes("Generating:")
                    ? "text-purple-300"
                    : "text-gray-300"
                }
              >
                {line}
                {index === currentLine && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    className="text-white"
                  >
                    |
                  </motion.span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating Code Elements */}
      <motion.div
        className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-1 sm:p-2"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <span className="text-purple-300 font-mono text-[8px] sm:text-[10px] md:text-xs">torch.nn.Transformer</span>
      </motion.div>

      <motion.div
        className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 rounded-lg p-1 sm:p-2"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <span className="text-pink-300 font-mono text-[8px] sm:text-[10px] md:text-xs">attention_weights</span>
      </motion.div>

      <motion.div
        className="absolute top-1/2 -right-4 sm:-right-8 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-1 sm:p-2"
        animate={{ x: [0, 10, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <span className="text-blue-300 font-mono text-[8px] sm:text-[10px] md:text-xs">self.embed_dim</span>
      </motion.div>
    </div>
  )
}
