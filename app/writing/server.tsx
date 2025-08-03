// app/writing/server.tsx
import { getSortedPostsData } from "@/lib/blog"

export async function getBlogsForClient() {
  const posts = await getSortedPostsData()
  return posts
}
