import BlogDetailPageClient from "./BlogDetailPageClient"
import { getPostData, getSortedPostsData } from "@/lib/blog" // Import from new utility
import type { Metadata } from "next"

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

// Per-post SEO metadata for rich embeds (Open Graph/Twitter)
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolved = await params
  const post = await getPostData(resolved.slug)

  // Fallback image when a post doesn't specify one
  const ogImage = post.image && post.image.trim() !== "" ? post.image : "/overlays/overlay-big.jpg"

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
  url: `/writing/${resolved.slug}`,
      title: post.title,
      description: post.description,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}
