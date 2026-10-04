"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import type { BlogPostContent } from "@/lib/blog" // Import the type
import NavBar from "@/components/nav-bar"
import WritingSidebar, { type RecentPost } from "@/components/writing-sidebar"


export default function BlogDetailPageClient({
  post,
  recentPosts,
}: {
  post: BlogPostContent // Receive the full post data as a prop
  recentPosts: RecentPost[]
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
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-lg text-gray-400 mb-8">The blog post you are looking for does not exist.</p>
          <Button 
            onClick={handleBack}
            className="bg-moss-600 hover:bg-moss-700 text-white rounded-full"
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

  // List the two shallowest heading levels the post uses; fall back to the title when it has none.
  const topLevel = Math.min(...post.headings.map((h) => h.level))
  const tocItems =
    post.headings.length > 0
      ? post.headings.filter((h) => h.level <= topLevel + 1)
      : [{ id: "post-title", text: post.title, level: 1 }]

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Navigation */}
      <NavBar />

      <div className="relative z-10 mx-auto flex max-w-7xl gap-10 px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <WritingSidebar recentPosts={recentPosts} activeSlug={post.slug} />

      <main className="min-w-0 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Back Button - Small clean arrow */}
          <button
            onClick={handleBack}
            className="mb-16 p-2 rounded-full hover:bg-white/5 transition-colors group"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>

          {/* Date and Category - Centered on one line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <p className="text-sm text-gray-400">{post.date}</p>
            <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-md text-xs font-medium tracking-wide">
              {formatCategory(post.category)}
            </span>
          </div>

          {/* Title - Centered */}
          <h1 id="post-title" className="scroll-mt-28 text-4xl md:text-5xl font-bold text-white mb-12 leading-tight tracking-tight text-center">
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
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-28
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-moss-400 prose-a:no-underline hover:prose-a:text-moss-300
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-moss-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
              prose-ul:my-6 prose-li:text-gray-300 prose-li:my-2
              prose-blockquote:border-l-moss-500 prose-blockquote:text-gray-400 prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </motion.div>
      </main>

        <aside className="hidden w-56 shrink-0 xl:block">
          <nav
            className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-gray-800"
            aria-label="On this page"
          >
            <ul className="flex flex-col">
              {tocItems.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={`-ml-px block border-l border-transparent py-1.5 pr-2 text-sm text-gray-400 transition-colors hover:border-white hover:text-white ${
                      heading.level > topLevel && post.headings.length > 0 ? "pl-8" : "pl-4"
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  )
}
