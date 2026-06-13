"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import type { BlogPostContent } from "@/lib/blog" // Import the type
import NavBar from "@/components/nav-bar"


export default function BlogDetailPageClient({
  post,
}: {
  post: BlogPostContent // Receive the full post data as a prop
}) {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  if (!post) {
    // This case should ideally be handled by generateStaticParams and getPostData
    // but kept for robust client-side error handling if direct navigation occurs.
    return (
      <div className="village-home village-light min-h-screen bg-[var(--v-bg)] text-[var(--v-ink)] relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-lg text-[var(--v-ink-soft)] mb-8">The blog post you are looking for does not exist.</p>
          <Button 
            onClick={handleBack}
            className="bg-[var(--v-clay)] hover:bg-[var(--v-clay-deep)] text-[var(--v-ink)] rounded-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
        </div>
      </div>
    )
  }

  // Check if image exists and is not empty
  const hasImage = post.image && post.image.trim() !== ""

  // Format category for display
  const formatCategory = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="village-home village-light min-h-screen bg-[var(--v-bg)] text-[var(--v-ink)] relative overflow-hidden">
      {/* Navigation */}
      <NavBar />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Back Button - Small clean arrow */}
          <button
            onClick={handleBack}
            className="mb-16 p-2 rounded-full hover:bg-[var(--v-paper)]/5 transition-colors group"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-[var(--v-ink-soft)] group-hover:text-[var(--v-ink)] transition-colors" />
          </button>

          {/* Date and Category - Centered on one line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <p className="text-sm text-[var(--v-ink-soft)]">{post.date}</p>
            <span className="inline-block px-3 py-1 bg-[var(--v-paper)]/10 text-[var(--v-ink)] rounded-md text-xs font-medium tracking-wide">
              {formatCategory(post.category)}
            </span>
          </div>

          {/* Title - Centered */}
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--v-ink)] mb-12 leading-tight tracking-tight text-center">
            {post.title}
          </h1>

          {/* Conditional Image Display */}
          {hasImage && (
            <div className="mb-16 rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Blog Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
              prose-p:text-[var(--v-ink-soft)] prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[var(--v-clay)] prose-a:no-underline hover:prose-a:text-[var(--v-clay)]
              prose-strong:text-[var(--v-ink)] prose-strong:font-semibold
              prose-code:text-[var(--v-clay)] prose-code:bg-[var(--v-paper)]/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-[var(--v-paper)]/5 prose-pre:border prose-pre:border-[var(--v-border)]/10 prose-pre:rounded-xl
              prose-ul:my-6 prose-li:text-[var(--v-ink-soft)] prose-li:my-2
              prose-blockquote:border-l-[var(--v-clay)] prose-blockquote:text-[var(--v-ink-soft)] prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </motion.div>
      </main>
    </div>
  )
}
