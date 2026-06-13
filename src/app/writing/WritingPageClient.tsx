"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation" // Keep usePathname for navigation styling
// New Client Component to handle filtering and UI interactions
// This component will receive the initial data as props
import { useState, useMemo } from "react"
import { BlogPostMetadata } from "@/lib/blog"
import NavBar from "@/components/nav-bar"

interface WritingPageClientProps {
  initialPosts: BlogPostMetadata[]
}

export default function WritingPageClient({ initialPosts }: WritingPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const pathname = usePathname() // usePathname is a client hook

  const categories = [
    { name: "All", value: "all" },
    { name: "SideNotes", value: "side-notes" },
    { name: "Error Logs", value: "error-logs" },
    { name: "Dev Notes", value: "dev-notes" },
    { name: "Highlights", value: "highlights" },
  ]

  const filteredBlogPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return initialPosts
    }
    return initialPosts.filter((post) => post.category === selectedCategory)
  }, [selectedCategory, initialPosts])

  return (
    <div className="village-home min-h-screen bg-[var(--v-bg)] text-[var(--v-ink)] relative overflow-hidden">
      {/* Navigation */}
        < NavBar />

      <main className="relative z-10 py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-medium text-[var(--v-ink)] mb-4 leading-tight py-4 pt-[25px] mt-[39px]">
              My <span className="text-[var(--v-clay)] font-normal">Writings</span>
            </h1>
            <p className="text-xl text-[var(--v-ink-soft)] max-w-2xl mx-auto">
              {"I often write about tech, self-help, and whatever bizarre thought hijacks my brain that day.\n"}
            </p>
          </motion.div>

          {/* Filter Buttons */}
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
                    ? "bg-[var(--v-clay)] text-[var(--v-ink)] hover:bg-[var(--v-clay-deep)]"
                    : "border-[var(--v-border)] text-[var(--v-ink-soft)] hover:bg-[var(--v-panel)] bg-transparent"
                } rounded-full px-4 py-2 text-sm`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.name}
              </Button>
            ))}
          </motion.div>

          {/* Blog Posts List */}
          <div className="flex flex-col gap-6">
            {filteredBlogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`bg-[var(--v-panel)]/30 border-[var(--v-border)]/50 backdrop-blur-sm p-6 rounded-3xl h-full flex flex-col md:flex-row items-start gap-6 transition-all duration-300 hover:bg-[var(--v-panel)]/40`}
                >
                  <div className="flex flex-col flex-grow">
                    <Link href={`/writing/${post.slug}`} className="block">
                      <h2 className="text-xl font-medium text-[var(--v-ink)] mb-2">{post.title}</h2>
                      <p className="text-[var(--v-ink-soft)] text-sm mb-4 line-clamp-3">{post.description}</p>
                    </Link>
                    <div className="flex items-center mt-auto w-full flex-row justify-start">
                      <p className="text-xs text-[var(--v-ink-soft)]">{post.date}</p>
                      <span className="py-1 bg-[var(--v-clay)]/20 text-[var(--v-clay)] rounded-full text-xs uppercase px-2 mx-2.5">
                        {post.category.replace(/-/g, " ")}
                      </span>
                      <Link href={`/writing/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-[var(--v-clay)] hover:text-[var(--v-ink)] mx-[-10px]">
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

    
    </div>
  )
}