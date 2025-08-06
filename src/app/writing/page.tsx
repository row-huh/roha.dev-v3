import WritingPageClient from "./WritingPageClient"
import { getSortedPostsData, type BlogPostMetadata } from "@/lib/blog" // Import from new utility


// This component is now a Server Component, so it can directly call server-side functions
export default async function WritingPage() {
  const allBlogPosts: BlogPostMetadata[] = await getSortedPostsData() // Fetch data on the server

  // Client-side state for filtering, moved to a separate client component if needed,
  // or handle filtering on the server if all categories are known at build time.
  // For now, we'll keep the filter logic on the client side, but the data fetching is server-side.
  // The `usePathname` hook requires 'use client', so the filtering logic will remain in a client component.
  // We'll pass the fetched data to a new client component.

  return <WritingPageClient initialPosts={allBlogPosts} />
}



