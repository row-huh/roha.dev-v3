"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"
import Image from "next/image"
import type { BlogPostContent } from "@/lib/blog" // Import the type

export default function BlogDetailPageClient({
  post,
}: {
  post: BlogPostContent // Receive the full post data as a prop
}) {
  if (!post) {
    // This case should ideally be handled by generateStaticParams and getPostData
    // but kept for robust client-side error handling if direct navigation occurs.
    return (
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex items-center justify-center">
        <InteractiveBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-lg text-gray-400 mb-8">The blog post you are looking for does not exist.</p>
          <Link href="/writing">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Writings
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link
                  href="/"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link
                  href="/projects"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  Work
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link href="/writing" className="px-4 py-2 rounded-full text-sm font-medium bg-gray-700/50 text-white">
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
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  Contact
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-16 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto" // Adjusted max-width for the overall content
        >
          <Link
            href="/writing"
            className="inline-flex items-center text-gray-400 hover:text-purple-400 mb-12 px-[5px] py-[31px] pt-[53px] pb-[26px]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Writings
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 mb-8 text-gray-400 text-sm">
            <p>{post.date}</p>
            <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs uppercase">
              {post.category.replace(/-/g, " ")}
            </span>
          </div>

          {/* Image section - now outside the main text block, but still within the max-width container */}
          <div className="max-w-4xl mx-auto mb-12">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={1200} // Wider image for full-page feel
              height={400} // Adjusted height
              className="rounded-2xl object-cover w-full h-96" // Full width within container, fixed height
            />
          </div>

          {/* Blog content - now within its own max-width for readability */}
          <div
            className="prose prose-invert max-w-5xl mx-auto text-gray-300 leading-relaxed" // max-w-5xl for readability
            dangerouslySetInnerHTML={{ __html: post.contentHtml }} // Use contentHtml
          />
        </motion.div>
      </main>
    </div>
  )
}
