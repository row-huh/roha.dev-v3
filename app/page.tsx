"use client"

import { motion, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, ExternalLink, Play } from "lucide-react"
import Link from "next/link"
import GranularBackground from "@/components/granular-background"
import AnimatedCuboids from "@/components/animated-cuboids"
import AIAssistantPreview from "@/components/ai-assistant-preview"

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const mouseX = motion.useMotionValue(0)
  const mouseY = motion.useMotionValue(0)

  const springX = motion.useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = motion.useSpring(mouseY, { stiffness: 100, damping: 30 })

  motion.useEffect(() => {
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
      <GranularBackground mouseX={springX} mouseY={springY} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-semibold text-white">
              roha.dev
            </motion.div>

            <div className="flex gap-8 text-sm font-medium">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                Work
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                Writing
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-medium text-white mb-6 leading-tight">
              Hey, I'm <span className="text-purple-400 font-normal">Roha</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Fullstack developer exploring AI engineering and building intelligent applications.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500"
            >
              Currently building LLMs from scratch
            </motion.div>
          </motion.div>

          {/* 3D Animated Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-96 w-full"
          >
            <AnimatedCuboids />
          </motion.div>
        </div>
      </section>

      {/* AI Assistant Section - Dedicated Space */}
      <section className="py-32 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-medium text-white mb-4">Meet My AI Assistant</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              I built an AI companion to help answer questions about my work, discuss AI concepts, and share insights
              from my journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AIAssistantPreview />
          </motion.div>
        </div>
      </section>

      {/* What I'm Building Section */}
      <section className="py-32 px-8 relative z-10">
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
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
              </div>
            </div>

            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-12 rounded-3xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="text-xl font-medium text-white mb-4">LLM from Scratch</h4>
                <p className="text-gray-400">Building intelligence, one layer at a time</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-medium text-white mb-6">Collaborations</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Building AI isn't just about the technology—it's about the people and moments that shape the journey.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                name: "Sarah Chen",
                role: "AI Researcher",
                quote:
                  "Roha brings a unique perspective to AI development. Their ability to bridge theory and practice is remarkable.",
              },
              {
                name: "Marcus Rodriguez",
                role: "Engineering Lead",
                quote:
                  "Working with Roha transformed how our team approaches machine learning. Truly innovative thinking.",
              },
              {
                name: "Dr. Aisha Patel",
                role: "Research Director",
                quote: "Roha doesn't just build AI—they craft experiences that make complex technology feel intuitive.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-8 rounded-3xl hover:bg-gray-800/40 transition-all duration-300">
                  <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Playing */}
      <section className="py-32 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-medium text-white mb-6">Currently Playing</h2>
            <p className="text-lg text-gray-400 mb-12">
              The soundtrack to late-night coding sessions and breakthrough moments.
            </p>

            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm p-8 rounded-3xl max-w-lg mx-auto">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium text-white mb-1">Resonance</h3>
                  <p className="text-gray-400 text-sm">HOME</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-medium text-white mb-6">Let's Build Something</h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Every great collaboration starts with a conversation. Let's create something that pushes boundaries.
            </p>
            <div className="flex gap-6 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-full"
                >
                  Start a Conversation
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-medium rounded-full bg-transparent"
                >
                  View My Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
