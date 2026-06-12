"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import { usePathname } from "next/navigation"
import NavBar from "@/components/nav-bar"

export default function ContactPage() {
  const pathname = usePathname()

  return (
    <div className="village-home village-light min-h-screen bg-[var(--v-bg)] text-[var(--v-ink)] relative overflow-hidden flex flex-col">
      {/* Navigation */}
      <NavBar />

      <main className="relative z-10 flex-grow flex items-center justify-center w-full px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl w-full items-start">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-[var(--v-ink)] mb-4 leading-tight">
              Get in <span className="text-[var(--v-clay)] font-normal">Touch</span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--v-ink-soft)] mb-8 leading-relaxed">
              Have a project in mind, a question about AI, or just want to say hello? 
              Feel free to reach out! I'm always open to new collaborations and conversations.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-3 sm:gap-4 text-[var(--v-ink-soft)] text-sm sm:text-base">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--v-clay)]" />
                <a href="mailto:roha.pathan125@gmail.com" className="hover:text-[var(--v-clay)] transition-colors">
                  roha.pathan125@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-[var(--v-ink-soft)] text-sm sm:text-base">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--v-clay)]" />
                <span>+92 325 7007071</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-[var(--v-ink-soft)] text-sm sm:text-base">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--v-clay)]" />
                <span>Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <Link href="https://github.com/row-huh" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-[var(--v-ink-soft)] hover:text-[var(--v-ink)]">
                    <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/roha-pathan-687960272/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-[var(--v-ink-soft)] hover:text-[var(--v-ink)]">
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              method="POST"
              action="https://formspree.io/f/mdkdydnj"
              className="space-y-5 sm:space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--v-ink-soft)] mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="bg-[var(--v-panel)]/50 border-[var(--v-border)] text-[var(--v-ink)] placeholder-gray-400 
                            focus:ring-[var(--v-clay)] focus:border-[var(--v-clay)]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--v-ink-soft)] mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className="bg-[var(--v-panel)]/50 border-[var(--v-border)] text-[var(--v-ink)] placeholder-gray-400 
                            focus:ring-[var(--v-clay)] focus:border-[var(--v-clay)]"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[var(--v-ink-soft)] mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="The TL;DR of your message"
                  className="bg-[var(--v-panel)]/50 border-[var(--v-border)] text-[var(--v-ink)] placeholder-gray-400 
                            focus:ring-[var(--v-clay)] focus:border-[var(--v-clay)]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--v-ink-soft)] mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Deploy your thoughts here..."
                  className="bg-[var(--v-panel)]/50 border-[var(--v-border)] text-[var(--v-ink)] placeholder-gray-400 
                            focus:ring-[var(--v-clay)] focus:border-[var(--v-clay)]"
                />
              </div>
              <Button
                className="w-full bg-[var(--v-clay)] hover:bg-[var(--v-clay-deep)] text-[var(--v-ink)] rounded-full 
                          py-3 text-base sm:text-lg font-semibold"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
