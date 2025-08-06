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
// import MySkills from "@/components/my-skills"



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
      < Cs50Certificates />

      {/* University Journey Section */}
      < UniversityJourney />


      {/* Hackathons Timeline Section */}
      < Timeline />

      {/* Barricade Tape */}
      < BarricadeTape text="CODE FOR FUN - NOT FOR MONEY"/>


      {/* Contractor Section */}
      < ContractorArc />

      {/* Barricade Tape */}
      < BarricadeTape text="CODE FOR FUN - NOT FOR MONEY" />

      {/* Deep Learning Journey Section */}
      < DeepLearningJourney />

      {/* What I'm Building Section */}
      < WhatImBuilding />

      {/* Collaborations */}
      <TestimonialsCarousel/>


      {/* What's Playing */}
      

      {/* Blogs Carousel Section */}
      < BlogsCarousel />

      {/* Final CTA */}

    </div>
  )
}

export default function HomePage() {
  return <HomePageContent />
}
