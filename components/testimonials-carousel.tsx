"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Github, Linkedin, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Testimonial {
  name: string
  role: string
  quote: string
  pfp: string
  socialLink?: {
    type: "github" | "linkedin" | "x"
    url: string
  }
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const testimonialsCount = testimonials.length

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current && testimonialsCount > 0) {
      const cardElement = carouselRef.current.children[0] as HTMLElement
      if (!cardElement) return

      const cardWidth = cardElement.offsetWidth // Width of a single card including its padding/margin

      let newScrollLeft
      let newIndex

      if (direction === "right") {
        newIndex = currentIndex + 1
        if (newIndex >= testimonialsCount) {
          // If we're at the end, loop back to the beginning
          newScrollLeft = 0
          newIndex = 0
        } else {
          newScrollLeft = carouselRef.current.scrollLeft + cardWidth
        }
      } else {
        // direction === "left"
        newIndex = currentIndex - 1
        if (newIndex < 0) {
          // If we're at the beginning, loop to the end
          newScrollLeft = (testimonialsCount - 1) * cardWidth
          newIndex = testimonialsCount - 1
        } else {
          newScrollLeft = carouselRef.current.scrollLeft - cardWidth
        }
      }

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
      setCurrentIndex(newIndex)
    }
  }

  return (
    <div className="relative">
      <div ref={carouselRef} className="flex overflow-x-auto scroll-smooth pb-4 no-scrollbar">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="flex-none w-full md:w-1/2 lg:w-1/3 px-4 snap-center"
            // Removed initial, whileInView, viewport, and transition for individual cards
            // to prevent re-animation on scroll jumps.
          >
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-8 rounded-3xl h-full flex flex-col justify-between hover:bg-gray-800/40 transition-all duration-300">
              <p className="text-sm text-gray-300 mb-6 leading-relaxed italic flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.pfp || "/placeholder.svg"}
                    alt={`${testimonial.name}'s profile picture`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                {testimonial.socialLink && (
                  <Link href={testimonial.socialLink.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      {testimonial.socialLink.type === "github" && <Github className="h-5 w-5" />}
                      {testimonial.socialLink.type === "linkedin" && <Linkedin className="h-5 w-5" />}
                      {testimonial.socialLink.type === "x" && <X className="h-5 w-5" />}
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -left-4 -translate-y-1/2 bg-gray-800/50 border-gray-700/50 backdrop-blur-md text-gray-300 hover:bg-gray-700 hover:text-white rounded-full z-20 hidden md:flex"
        onClick={() => scroll("left")}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 -translate-y-1/2 bg-gray-800/50 border-gray-700/50 backdrop-blur-md text-gray-300 hover:bg-gray-700 hover:text-white rounded-full z-20 hidden md:flex"
        onClick={() => scroll("right")}
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
