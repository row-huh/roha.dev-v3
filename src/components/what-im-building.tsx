import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

export default function WhatImBuilding() {
    return (
             <section className="py-56 px-8 relative z-10 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h3 className="text-3xl font-medium text-white mb-6">What I'm Building</h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Currently crafting an LLM from scratch, diving deep into transformer architectures and attention
                mechanisms. It's about understanding how intelligence emerges from mathematics.
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/row-huh/llm-from-scratch" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                </Link>
                <Link href="/writing/llms-from-scratch">
                  {" "}
                  {/* Updated href */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Dev Log
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center bg-gray-800/30 border-gray-700/50 backdrop-blur-sm px-8 py-11 rounded-3xl transition-all duration-300 hover:bg-gray-700/50 hover:border-purple-500/50">
              <Link
                href="https://github.com/row-huh/llm-from-scratch"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-32 h-32"
              >
                <Github className="h-16 w-16 text-gray-400 transition-colors duration-300 group-hover:text-white" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    )
}