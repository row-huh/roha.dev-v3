"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Sparkles, Linkedin, Github } from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"
import { usePathname } from "next/navigation"
import NavBar from "@/components/nav-bar"


export default function ContactPage() {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex flex-col">
      <InteractiveBackground />

      {/* Navigation */}
      <NavBar />

      <main className="relative z-10 flex-grow flex items-center justify-center max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side: Get in Touch & Details */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-6xl font-medium text-white mb-4 leading-tight">
            Get in <span className="text-purple-400 font-normal">Touch</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Have a project in mind, a question about AI, or just want to say hello? Feel free to reach out! I'm always
            open to new collaborations and interesting conversations.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-300">
              <Mail className="h-6 w-6 text-purple-400" />
              <a href="mailto:roha.pathan@example.com" className="hover:text-purple-300 transition-colors">
                roha.pathan125@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <Phone className="h-6 w-6 text-purple-400" />
              <span>+92 325 7007071</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <MapPin className="h-6 w-6 text-purple-400" />
              <span>Karachi, Pakistan</span>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <Link href="https://github.com/row-huh" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Github className="h-6 w-6" />
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/roha-pathan" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Your Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                placeholder="Regarding a project, collaboration, etc."
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Your Message
              </label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Type your message here..."
                className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 text-lg font-semibold"
            >
              Send Message
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
