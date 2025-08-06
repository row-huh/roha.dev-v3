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



  const testimonials = [
    {
      name: "Komal Kamal Khan",
      role: "Country Lead @SKOOL21",
      quote:
        "I had the pleasure of working with this brilliant young woman in the software space. She built a digital platform that sparks curiosity in young minds about coding. What stood out most was her quiet dedication—focused, sincere, and refreshingly free of unnecessary noise. I genuinely look forward to working with her again and seeing where her creativity takes her next.",
      pfp: "/placeholder.svg?height=40&width=40",
      socialLink: { type: "linkedin", url: "https://linkedin.com/in/sarahchen" },
    },
    {
      name: "Hassan Mehmood",
      role: "FullStack Developer",
      quote:
        "I had the chance to work with Roha during the MalamaAI hackathon, and she was an incredible team lead. She took the lead on the backend, setting up and managing the Flask API, and made sure the integration with the frontend and AI model was seamless.She also played a big role in improving the machine learning model’s accuracy. Her focus on fine-tuning and testing really helped us push the model's performance to the next level. Roha’s leadership, hands-on approach, and strong technical skills made a big difference for our team. It was great working alongside her on this project!",
      pfp: "/placeholder.svg?height=40&width=40",
      socialLink: { type: "github", url: "https://github.com/marcusrod" },
    },
    {
      name: "Okeoma Amaobi",
      role: "AI Engineer",
      quote:
        "Roha is a great team leader. We worked together on a hackathon, and I was impressed by how she handled the team and delegated tasks to individuals. She’s built for speed and knows how to navigate through challenges effectively. She also makes sure communication is constant, so no one is left out",
      pfp: "/placeholder.svg?height=40&width=40",
      socialLink: { type: "x", url: "https://x.com/aishapatel_ai" },
    },
    {
      name: "Manail Ghouri",
      role: "Web Developer",
      quote:
        "Roha is a dedicated and talented developer with a strong command of backend development and AI technologies. I had the chance to work with her on two impactful projects. In Neutral, presented at Bahria University’s Techathon, she worked with advanced models like Gemini and LLaMA to detect biases in hiring decisions. Her efforts helped our team place in the top 6 out of 57 teams. In the After School project for the Google Vertex AI Hackathon, she led the backend and integrated a RAG-based AI system using Flask and Vertex AI Agent Builder. Roha is hardworking, collaborative, and brings real value to every team she joins.",
      pfp: "/placeholder.svg?height=40&width=40",
      socialLink: { type: "linkedin", url: "https://linkedin.com/in/davidlee" },
    },
    {
      name: "Laiba Laeeq",
      role: "CEO @Garmist",
      quote: "Their deep understanding of LLMs from scratch is truly inspiring and impactful.",
      pfp: "/placeholder.svg?height=40&width=40",
      socialLink: { type: "github", url: "https://github.com/emilywhite" },
    },
  ]


function Testimonials() {
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



export default function TestimonialsCarousel() {
    return (
        <section className="py-56 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-medium text-white mb-6">What people I've worked with have to say about me </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              These are feedbacks from some of the best people I've ever worked with
            </p>
          </motion.div>

          < Testimonials />
        </div>
      </section>
    )
}

