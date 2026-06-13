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
  <div className="village-home min-h-screen relative overflow-hidden">
      {/* Decorative cottagecore sprites — subtle, behind everything */}
      <div aria-hidden className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden">
        <span className="animate-village-bob absolute left-[4%] top-[18%] text-4xl opacity-30">🪴</span>
        <span className="animate-village-bob absolute right-[6%] top-[30%] text-5xl opacity-25" style={{ animationDelay: "1.2s" }}>🌿</span>
        <span className="animate-village-bob absolute left-[8%] top-[52%] text-4xl opacity-25" style={{ animationDelay: "0.6s" }}>🍄</span>
        <span className="animate-village-bob absolute right-[9%] top-[64%] text-4xl opacity-30" style={{ animationDelay: "2s" }}>☕</span>
        <span className="animate-village-bob absolute left-[5%] top-[80%] text-4xl opacity-25" style={{ animationDelay: "1.6s" }}>🕯️</span>
        <span className="animate-village-bob absolute right-[5%] top-[88%] text-4xl opacity-25" style={{ animationDelay: "0.9s" }}>🌙</span>
      </div>

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

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
    </div>
  )
}

export default function HomePage() {
  return <HomePageContent />
}
