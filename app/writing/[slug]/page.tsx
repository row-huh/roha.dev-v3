import BlogDetailPageClient from "./BlogDetailPageClient"
import { getPostData, getSortedPostsData } from "@/lib/blog" // Import from new utility

// Function to generate static params for SSG
export async function generateStaticParams() {
  const posts = await getSortedPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const postData = await getPostData(params.slug)
  return <BlogDetailPageClient post={postData} />
}
