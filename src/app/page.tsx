"use client"

import { useScroll, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import HeroSection from "@/components/hero-section"
import NavBar from "@/components/nav-bar"
import MySkills from "@/components/my-skills"
import WhatImBuilding from "@/components/what-im-building"
import WhatsPlaying from "@/components/whats-playing"
import Footer from "@/components/footer"
import CTA from "@/components/cta"
import BlogsCarousel from "@/components/blogs-carousel"
import ScrollProgress from "@/components/scroll-progress"
import ThemeToggle from "@/components/theme-toggle"


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
  <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Themed background: graph-paper grid in light, faint grain in dark */}
      <div className="bg-page-grid fixed inset-0 pointer-events-none" />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Navigation */}
      < NavBar />

      {/* Hero Section */}
      <div id="hero">
        < HeroSection />
      </div>

      {/* Blogs Carousel Section */}
      <div id="blogs">
        < BlogsCarousel/>
      </div>

      {/* My Skills Section */}
      <div id="skills">
        < MySkills />
      </div>

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
      {/* < BarricadeTape text="CODE COFFEE REPEAT" /> */}

      {/* Deep Learning Journey Section */}
      {/* < DeepLearningJourney /> */}

      {/* What I'm Building Section */}
      <div id="building">
        < WhatImBuilding />
      </div>


      {/* Collaborations */}
      <div id="testimonials">
        <TestimonialsCarousel/>
      </div>






      {/* Final CTA */}
      <div id="cta">
        < CTA />
      </div>

      {/* Footer - no extra space below */}
      <Footer />

      {/* Floating Spotify player, pinned to the bottom-left corner */}
      <WhatsPlaying />
    </div>
  )
}

export default function HomePage() {
  return <HomePageContent />
}
