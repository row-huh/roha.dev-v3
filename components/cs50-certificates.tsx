"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award } from "lucide-react"

interface CertificateCardProps {
  title: string
  certificateLink: string
}

function CertificateCard({ title, certificateLink }: CertificateCardProps) {
  return (
    <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 hover:bg-gray-800/40">
      <Award className="h-10 w-10 text-purple-400 mb-4" />
      <h3 className="text-2xl font-semibold text-white mb-6">{title}</h3>
      <Link href={certificateLink} target="_blank" rel="noopener noreferrer">
        <Button
          variant="outline"
          className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-6 py-3"
        >
          <ExternalLink className="h-4 w-4 mr-2" /> View Certificate
        </Button>
      </Link>
    </Card>
  )
}

export default function Cs50Certificates() {
  return (
    <section className="py-56 px-8 relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-medium text-purple-400 mb-6 leading-tight">How it Began...</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Back in high school, I started messing around with C and joined CS50x. I didn’t end up finishing it, but it
            got me hooked. I went on to complete CS50p and CS50AI - and that’s when I really fell in love with coding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CertificateCard
              title="CS50P: Programming with Python"
              certificateLink="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Djw3OP1LQTb8cKUF8p9N8yUGW44mMg.png" // Direct link to CS50P certificate image
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CertificateCard
              title="CS50AI: Artificial Intelligence"
              certificateLink="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7jpxTxs6g9LbJyNBaI2TbQIbjJgMzL.png" // Direct link to CS50 AI certificate image
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
