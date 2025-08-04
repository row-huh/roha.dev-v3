import { getSortedPostsData } from "@/lib/blog"
import type { BlogPostMetadata } from "@/lib/blog"
import ClientWritingPage from "./ClientWritingPage"

export default async function WritingPage() {
  const allBlogPosts: BlogPostMetadata[] = await getSortedPostsData()
  return <ClientWritingPage initialPosts={allBlogPosts} />
}
