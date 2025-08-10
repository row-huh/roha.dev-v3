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
    pfp: "/testimonials/komal.png",
    socialLink: { type: "linkedin", url: "https://www.linkedin.com/in/komal-kamal-khan-ba2417366/" },
  },
  {
    name: "Hassan Mehmood",
    role: "FullStack Developer",
    pfp: "/testimonials/hassan.png",

    quote:
      "I had the chance to work with Roha during the MalamaAI hackathon, and she was an incredible team lead. She took the lead on the backend, setting up and managing the Flask API, and made sure the integration with the frontend and AI model was seamless.She also played a big role in improving the machine learning model's accuracy. Her focus on fine-tuning and testing really helped us push the model's performance to the next level. Roha's leadership, hands-on approach, and strong technical skills made a big difference for our team. It was great working alongside her on this project!",
    socialLink: { type: "linkedin", url: "https://www.linkedin.com/in/hassan-mehmood413/" },
  },
  {
    name: "Manail Ghouri",
    role: "Web Developer",
    quote:
      "Roha is a dedicated and talented developer with a strong command of backend development and AI technologies. I had the chance to work with her on two impactful projects. In Neutral, presented at Bahria University's Techathon, she worked with advanced models like Gemini and LLaMA to detect biases in hiring decisions. Her efforts helped our team place in the top 6 out of 57 teams. In the After School project for the Google Vertex AI Hackathon, she led the backend and integrated a RAG-based AI system using Flask and Vertex AI Agent Builder. Roha is hardworking, collaborative, and brings real value to every team she joins.",
    pfp: "/testimonials/manail.png",
    socialLink: { type: "linkedin", url: "https://www.linkedin.com/in/manail-ghouri-a28069256/" },
  },
  {
    name: "Okeoma Amaobi",
    role: "AI Engineer",
    quote:
      "Roha is a great team leader. We worked together on a hackathon, and I was impressed by how she handled the team and delegated tasks to individuals. She's built for speed and knows how to navigate through challenges effectively. She also makes sure communication is constant, so no one is left out",
    pfp: "/testimonials/okeoma.png",
    socialLink: { type: "x", url: "https://x.com/okey_amy" },
  },
  {
    name: "Laiba Laeeq",
    role: "Software Developer",
    quote: "I've worked with Roha on a bunch of projects and she's genuinely one of the sharpest people I've collaborated with. She's not only great at writing clean, solid code but also an incredible problem-solver with creative input and a dependable leader. Definitely someone you'd want on your team any day.",
    pfp: "/testimonials/placeholder.png",
    socialLink: { type: "github", url: "https://github.com/laiba-lax" },
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
      <div 
        ref={carouselRef} 
        className="flex overflow-x-auto scroll-smooth pb-4 gap-4 sm:gap-6"
        style={{ 
          scrollbarWidth: 'thin', 
          scrollbarColor: '#6b21a8 #1f2937'
        }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="flex-none w-80 sm:w-96 md:w-[360px] px-3 snap-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-5 rounded-3xl h-full flex flex-col justify-between :bhoverg-gray-800/40 transition-all duration-300">
              <p className="text-xs text-gray-300 mb-4 italic flex-grow leading-tight">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.pfp || "/testimonials/placeholder.png"}
                    alt={`${testimonial.name}'s profile picture`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-12 h-12"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                  <div>
                    <p className="font-medium text-sm text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                {testimonial.socialLink && (
                  <Link href={testimonial.socialLink.url} target="_blank" rel="noopener noreferrer">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-400 hover:text-white"
                    >
                      {testimonial.socialLink.type === "github" && <Github className="h-4 w-4" />}
                      {testimonial.socialLink.type === "linkedin" && <Linkedin className="h-4 w-4" />}
                      {testimonial.socialLink.type === "x" && <X className="h-4 w-4" />}
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons - now visible on all screen sizes */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-900/90 border-purple-400/30 backdrop-blur-md text-purple-300 hover:bg-purple-900/60 hover:text-white hover:border-purple-400/50 rounded-full z-20 flex transition-all duration-300 hover:scale-110"
        onClick={() => scroll("left")}
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-900/90 border-purple-400/30 backdrop-blur-md text-purple-300 hover:bg-purple-900/60 hover:text-white hover:border-purple-400/50 rounded-full z-20 flex transition-all duration-300 hover:scale-110"
        onClick={() => scroll("right")}
      >
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <style jsx>{`
        /* Custom scrollbar for mobile */
        @media (max-width: 640px) {
          div[style*="scrollbarWidth"]::-webkit-scrollbar {
            height: 4px;
            display: block;
          }
          div[style*="scrollbarWidth"]::-webkit-scrollbar-track {
            background: #1f2937;
            border-radius: 10px;
          }
          div[style*="scrollbarWidth"]::-webkit-scrollbar-thumb {
            background: #6b21a8;
            border-radius: 10px;
          }
          div[style*="scrollbarWidth"]::-webkit-scrollbar-thumb:hover {
            background: #7c3aed;
          }
        }
      `}</style>
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
          <h2 className="text-4xl font-medium text-white mb-6">
            What people I've worked with have to say about me
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            These are feedbacks from some of the best people I've ever worked with
          </p>
        </motion.div>

        <Testimonials />
      </div>
    </section>
  )
}