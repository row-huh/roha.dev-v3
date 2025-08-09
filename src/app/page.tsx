"use client"

import { motion, useScroll, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import InteractiveBackground from "@/components/interactive-background"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import HeroSection from "@/components/hero-section"
import NavBar from "@/components/nav-bar"
import MySkills from "@/components/my-skills"
import Cs50Certificates from "@/components/cs50-certificates"
import UniversityJourney from "@/components/university-journey"
import Timeline from "@/components/timeline"
import BarricadeTape from "@/components/barricade-tape"
import ContractorArc from "@/components/contractor"
import DeepLearningJourney from "@/components/deep-learning-journey"
import WhatImBuilding from "@/components/what-im-building"
import BlogsCarousel from "@/components/blogs-carousel" //(redesign to fetch the latest blogs from the pages or stuff, also let's make some crm or shit??)
import WhatsPlaying from "@/components/whats-playing"
import Footer from "@/components/footer"


function HomePageContent() {
  const { scrollYProgress } = useScroll()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const pathname = usePathname()

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
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
      <InteractiveBackground />

      {/* Navigation */}
      < NavBar />

      {/* Hero Section */}
      < HeroSection />

      {/* My Skills Section */}
      < MySkills />

      {/* My Coding Journey Section (Certificates) */}
      {/* < Cs50Certificates /> */}

      {/* University Journey Section */}
      {/* < UniversityJourney /> */}


      {/* Hackathons Timeline Section */}
      {/* < Timeline /> */}

      {/* Barricade Tape */}
      {/* < BarricadeTape text="CODE FOR FUN - NOT FOR MONEY"/> */}


      {/* Contractor Section */}
      {/* < ContractorArc /> */}

      {/* Barricade Tape */}
      {/* < BarricadeTape text="CODE FOR FUN - NOT FOR MONEY" /> */}

      {/* Deep Learning Journey Section */}
      < DeepLearningJourney />

      {/* What I'm Building Section */}
      < WhatImBuilding />

      {/* Collaborations */}
      <TestimonialsCarousel/>


      {/* What's Playing */}
      < WhatsPlaying />

      {/* Blogs Carousel Section */}
      < BlogsCarousel />

      {/* Final CTA */}
            {/* Final CTA */}
      <section className="py-56 px-8 relative z-10">
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
      <Footer />
    </div>
  )
}

export default function HomePage() {
  return <HomePageContent />
}
