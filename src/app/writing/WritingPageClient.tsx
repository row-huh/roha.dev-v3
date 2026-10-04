"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import { BlogPostMetadata } from "@/lib/blog"
import NavBar from "@/components/nav-bar"
import WritingSidebar, { writingTopics } from "@/components/writing-sidebar"

interface WritingPageClientProps {
  initialPosts: BlogPostMetadata[]
}

const RECENT_COUNT = 3

export default function WritingPageClient({ initialPosts }: WritingPageClientProps) {
  const [selectedTopic, setSelectedTopic] = useState("all")

  // Topic links on post pages arrive as /writing?topic=<value>
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic")
    if (topic && writingTopics.some((t) => t.value === topic)) setSelectedTopic(topic)
  }, [])

  const filteredPosts = useMemo(() => {
    if (selectedTopic === "all") return initialPosts
    return initialPosts.filter((post) => post.category === selectedTopic)
  }, [selectedTopic, initialPosts])

  const recentPosts = initialPosts.slice(0, RECENT_COUNT)

  return (
    <div className="min-h-screen bg-black text-white relative">
      <NavBar />

      <div className="relative z-10 mx-auto flex max-w-7xl gap-12 px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <WritingSidebar recentPosts={recentPosts} selectedTopic={selectedTopic} onSelectTopic={setSelectedTopic} />

        <main className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-4xl font-medium leading-tight text-white md:text-5xl">
              My <span className="font-normal text-moss-400">Writings</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              I often write about tech, self-help, and whatever bizarre thought hijacks my brain that day.
            </p>
          </motion.div>

          {/* Topic chips: mobile and tablet, where the sidebar is hidden */}
          <div className="mb-10 flex flex-wrap justify-center gap-2 lg:hidden">
            {[{ name: "All posts", value: "all" }, ...writingTopics].map((topic) => (
              <button
                key={topic.value}
                onClick={() => setSelectedTopic(topic.value)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  selectedTopic === topic.value
                    ? "border-moss-600 bg-moss-600 text-white"
                    : "border-gray-700 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>

          <div className="mx-auto flex max-w-3xl flex-col divide-y divide-gray-800">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.06 }}
                className="py-8 first:pt-0"
              >
                <Link href={`/writing/${post.slug}`} className="group block">
                  <p className="mb-2 text-sm text-gray-400">{post.date}</p>
                  <h2 className="mb-2 text-xl font-medium text-white transition-colors group-hover:text-moss-400">
                    {post.title}
                  </h2>
                  <p className="mb-3 line-clamp-3 text-gray-300">{post.description}</p>
                  <p className="text-sm capitalize text-gray-500">{post.category.replace(/-/g, " ")}</p>
                </Link>
              </motion.article>
            ))}
            {filteredPosts.length === 0 && (
              <p className="py-8 text-center text-gray-400">Nothing here yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
