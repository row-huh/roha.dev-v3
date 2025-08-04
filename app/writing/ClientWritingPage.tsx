"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles } from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useMemo } from "react"
import type { BlogPostMetadata } from "@/lib/blog"

interface WritingPageClientProps {
  initialPosts: BlogPostMetadata[]
}

export default function ClientWritingPage({ initialPosts }: WritingPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const pathname = usePathname()

  const categories = [
    { name: "All", value: "all" },
    { name: "SideNotes", value: "side-notes" },
    { name: "Error Logs", value: "error-logs" },
    { name: "Dev Notes", value: "dev-notes" },
    { name: "Highlights", value: "highlights" },
  ]

  const filteredBlogPosts = useMemo(() => {
    if (selectedCategory === "all") return initialPosts
    return initialPosts.filter((post) => post.category === selectedCategory)
  }, [selectedCategory, initialPosts])

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <InteractiveBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-semibold text-white">
              roha.dev
            </motion.div>
            <div className="flex gap-1 bg-gray-800/50 rounded-full p-1 border border-gray-700/50 backdrop-blur-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Work", href: "/projects" },
                { label: "Writing", href: "/writing", active: true },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href, active }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href={href}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      active
                        ? "bg-gray-700/50 text-white"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-medium text-white mb-4 leading-tight py-4 pt-[25px] mt-[39px]">
              My <span className="text-purple-400 font-normal">Writings</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              I often write about tech, self-help, and whatever bizarre thought hijacks my brain that day.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                className={`${
                  selectedCategory === category.value
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                } rounded-full px-4 py-2 text-sm`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.name}
              </Button>
            ))}
          </motion.div>

          {/* Blog List */}
          <div className="flex flex-col gap-6">
            {filteredBlogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-6 rounded-3xl h-full flex flex-col md:flex-row items-start gap-6 transition-all duration-300 hover:bg-gray-800/40">
                  <Link href={`/writing/${post.slug}`} className="block w-full md:w-auto">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={200}
                      height={120}
                      className="rounded-2xl object-cover w-full md:w-48 h-32 md:h-auto flex-shrink-0 mb-4 md:mb-0"
                    />
                  </Link>
                  <div className="flex flex-col flex-grow">
                    <Link href={`/writing/${post.slug}`}>
                      <h2 className="text-xl font-medium text-white mb-2">{post.title}</h2>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.description}</p>
                    </Link>
                    <div className="flex items-center mt-auto">
                      <p className="text-xs text-gray-400">{post.date}</p>
                      <span className="py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs uppercase px-2 mx-2.5">
                        {post.category.replace(/-/g, " ")}
                      </span>
                      <Link href={`/writing/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-white mx-[-10px]">
                          Read More <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Link href="/contact">
        <Button
          variant="outline"
          className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent px-4 py-2 fixed bottom-8 right-8"
        >
          <Sparkles className="h-4 w-4 mr-2" /> Contact Me
        </Button>
      </Link>
    </div>
  )
}
