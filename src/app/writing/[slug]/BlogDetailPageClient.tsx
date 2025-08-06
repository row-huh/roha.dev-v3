"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"
import Image from "next/image"
import type { BlogPostContent } from "@/lib/blog" // Import the type
import NavBar from "@/components/nav-bar"


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
      < NavBar />

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
            {/* <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={1200} // Wider image for full-page feel
              height={400} // Adjusted height
              className="rounded-2xl object-cover w-full h-96" // Full width within container, fixed height
            /> */}
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
