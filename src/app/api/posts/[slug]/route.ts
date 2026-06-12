import { getPostData } from "@/lib/blog"

// Returns a single post's rendered HTML + metadata for client-side viewers
// (used by OS-mode's PDF-styled blog reader).
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = await getPostData(slug)
    return new Response(
      JSON.stringify({
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        category: post.category,
        contentHtml: post.contentHtml,
      }),
      {
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  } catch (e) {
    return new Response(JSON.stringify({ error: "Post not found" }), {
      headers: { "content-type": "application/json" },
      status: 404,
    })
  }
}
