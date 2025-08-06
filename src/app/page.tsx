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
// import BlogsCarousel from "@/components/blogs-carousel" (redesign to fetch the latest blogs from the pages or stuff, also let's make some crm or shit??)
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


      {/* Barricade Tape */}
      < BarricadeTape text="CODE FOR FUN - NOT FOR MONEY" />

      {/* Deep Learning Journey Section */}
      

      {/* What I'm Building Section */}
      
      {/* Collaborations */}
      <TestimonialsCarousel/>


      {/* What's Playing */}
      <section className="py-56 px-8 relative z-10">
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

            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm p-4 rounded-3xl max-w-2xl mx-auto">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/track/6zHiZppuA4gzZoaiMUu0hf?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Embed"
              ></iframe>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blogs Carousel Section */}

      {/* Final CTA */}

    </div>
  )
}

export default function HomePage() {
  return <HomePageContent />
}
