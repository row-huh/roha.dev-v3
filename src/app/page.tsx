"use client"

import { useScroll, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import InteractiveBackground from "@/components/interactive-background"
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
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Interactive Background with Marble */}
      <InteractiveBackground />

      {/* Navigation */}
      < NavBar />

      {/* Hero Section */}
      <div id="hero">
        < HeroSection />
      </div>

      {/* What's Playing */}
      <div id="playing">
        < WhatsPlaying />
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
      {/* < BarricadeTape text="CODE FOR FUN - NOT FOR MONEY" /> */}

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
    </div>
  )
}

export default function HomePage() {
  return <HomePageContent />
}
