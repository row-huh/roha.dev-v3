"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award } from "lucide-react"

interface CertificateProps {
  title: string
  certificateLink: string // Link to the hosted certificate image
  learningContent: string // This will now be a concise summary
}

function CertificateCard({ title, certificateLink, learningContent }: CertificateProps) {
  return (
    <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:bg-gray-800/40">
      <div className="flex flex-col items-center text-center mb-6">
        <Award className="h-10 w-10 text-purple-400 mb-4" /> {/* Slightly smaller icon */}
        <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3> {/* Slightly bolder title */}
        <p className="text-base text-gray-300 leading-relaxed mb-6 line-clamp-3">{learningContent}</p>{" "}
        {/* Concise content, always visible */}
        <Link href={certificateLink} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-6 py-3"
          >
            <ExternalLink className="h-4 w-4 mr-2" /> View Certificate
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default function Cs50Journey() {
  // Concise summaries for a cleaner look
  const cs50pLearning = `CS50P provided my foundational programming skills in Python, covering core concepts like functions, loops, and data structures. It built my problem-solving abilities through challenging problem sets.`

  const cs50aiLearning = `CS50AI introduced me to key AI concepts including search algorithms, machine learning, and neural networks. I gained practical experience building AI agents and understanding fundamental AI principles.`

  return (
    <section className="py-32 px-8 relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-medium text-purple-400 mb-4 leading-tight">My Coding Journey</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">It all started with CS50...</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CertificateCard
              title="CS50P Certificate"
              certificateLink="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Djw3OP1LQTb8cKUF8p9N8yUGW44mMg.png" // Direct link to CS50P certificate image
              learningContent={cs50pLearning}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CertificateCard
              title="CS50 Artificial Intelligence Certificate"
              certificateLink="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7jpxTxs6g9LbJyNBaI2TbQIbjJgMzL.png" // Direct link to CS50 AI certificate image
              learningContent={cs50aiLearning}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
