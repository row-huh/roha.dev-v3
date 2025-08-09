import BlogDetailPageClient from "./BlogDetailPageClient"
import { getPostData, getSortedPostsData } from "@/lib/blog" // Import from new utility

// Function to generate static params for SSG
export async function generateStaticParams() {
  const posts = await getSortedPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}


type Props = {
  params: Promise<{ slug: string }>  // params is a Promise in Next 14 async route
}

export default async function BlogDetailPage({
  params,
}: Props) {
  const resolvedParams = await params
  const postData = await getPostData(resolvedParams.slug)
  return <BlogDetailPageClient post={postData} />
}
