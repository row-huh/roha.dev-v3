"use client"

import { motion, useScroll, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import InteractiveBackground from "@/components/interactive-background"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import HeroSection from "@/components/hero-section"
import BlogsCarousel from "@/components/blogs-carousel"
import MySkills from "@/components/my-skills"
import { usePathname } from "next/navigation"
import Footer from "@/components/footer"
import Cs50Certificates from "@/components/cs50-certificates"
import UniversityJourney from "@/components/university-journey"
import Timeline from "@/components/timeline"
import BarricadeTape from "@/components/barricade-tape"
import DeepLearningJourney from "@/components/deep-learning-journey" // Import the new component

// Extracted HomePage content into a separate component for cleaner conditional rendering
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
      name: "Neha P",
      role: "CEO @Garmist",
      quote: "Their deep understanding of LLMs from scratch is truly inspiring and impactful.",
      pfp: "/placeholder.svg?height=40&width=40",
      socialLink: { type: "github", url: "https://github.com/emilywhite" },
    },
  ]

  const blogPosts = [
    {
      title: "Demystifying Transformer Architectures",
      description: "A deep dive into the core components of modern large language models.",
      date: "July 25, 2025",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "The Future of AI in Web Development",
      description: "Exploring how AI is changing the landscape for fullstack developers.",
      date: "July 18, 2025",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "Building a Simple Neural Network from Scratch",
      description: "A step-by-step guide to understanding the basics of deep learning.",
      date: "July 10, 2025",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "Optimizing LLM Inference for Production",
      description: "Strategies and techniques for deploying large language models efficiently.",
      date: "June 30, 2025",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Interactive Background with Marble */}
      <InteractiveBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-semibold text-white">
              roha.dev
            </motion.div>

            <div className="flex items-center gap-4">
              <div className="flex gap-1 bg-gray-800/50 rounded-full p-1 border border-gray-700/50 backdrop-blur-sm">
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href="/about"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/about" ? "bg-gray-700/50 text-white" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"}`}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href="/projects"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/projects" ? "bg-gray-700/50 text-white" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"}`}
                  >
                    Work
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href="/writing"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/writing" ? "bg-gray-700/50 text-white" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"}`}
                  >
                    Writing
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href="/contact"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === "/contact" ? "bg-gray-700/50 text-white" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"}`}
                  >
                    Contact
                  </Link>
                </motion.div>
              </div>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent px-4 py-2"
                >
                  <Sparkles className="h-4 w-4 mr-2" /> Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* My Skills Section */}
      <MySkills />

      {/* My Coding Journey Section (Certificates) */}
      <Cs50Certificates />

      {/* University Journey Section */}
      <UniversityJourney />

      {/* Hackathons Timeline Section */}
      <Timeline />

      {/* Barricade Tape */}
      <BarricadeTape text="Work in Progress" />

      {/* Contractor Section */}
      <section className="py-56 px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-medium text-purple-400 mb-6">Then came my freelancer arc...</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              I undertook small projects for various clients, including website development, curriculum development, and
              tutoring individuals in programming topics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Barricade Tape */}
      <BarricadeTape text="Work in Progress" />

      {/* Deep Learning Journey Section */}
      <DeepLearningJourney />

      {/* What I'm Building Section */}
      <section className="py-56 px-8 relative z-10 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h3 className="text-3xl font-medium text-white mb-6">What I'm Building</h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Currently crafting an LLM from scratch, diving deep into transformer architectures and attention
                mechanisms. It's about understanding how intelligence emerges from mathematics.
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/row-huh/llm-from-scratch" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                </Link>
                <Link href="/writing/llms-demystified">
                  {" "}
                  {/* Updated href */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Dev Log
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center bg-gray-800/30 border-gray-700/50 backdrop-blur-sm px-8 py-11 rounded-3xl transition-all duration-300 hover:bg-gray-700/50 hover:border-purple-500/50">
              <Link
                href="https://github.com/row-huh/llm-from-scratch"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-32 h-32"
              >
                <Github className="h-16 w-16 text-gray-400 transition-colors duration-300 group-hover:text-white" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collaborations */}
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

          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

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
                src="https://open.spotify.com/embed/track/5UWJxql2C2VNLAusOQRjt1?utm_source=generator&theme=0"
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
      <section className="py-56 px-8 relative z-10 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-medium text-white mb-6">Latest Insights</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Dive into my thoughts on AI, development, and the future of technology.
            </p>
          </motion.div>

          <BlogsCarousel posts={blogPosts} />
        </div>
      </section>

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
