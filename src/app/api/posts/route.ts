import { getSortedPostsData } from "@/lib/blog"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limitParam = searchParams.get("limit")
  const limit = Math.max(1, Math.min(Number(limitParam) || 4, 12))

  try {
    const posts = await getSortedPostsData()
    const items = posts.slice(0, limit).map((p) => ({
      title: p.title,
      description: p.description,
      date: p.date,
      image: p.image,
      link: `/writing/${p.slug}`,
    }))

    return new Response(JSON.stringify(items), {
      headers: { "content-type": "application/json" },
      status: 200,
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to load posts" }), {
      headers: { "content-type": "application/json" },
      status: 500,
    })
  }
}
